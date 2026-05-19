import { NextRequest, NextResponse } from "next/server";
import {
  appendOrderToSheet,
  getGoogleSheetHeaders,
} from "@/lib/google-sheets";
import { sendBusinessOrderEmail, sendCustomerOrderEmail } from "@/lib/email";
import { buildOrderRecord, createOrderTimestamp, generateOrderId } from "@/lib/order";
import { getOfferBySku } from "@/lib/catalog";
import { orderPayloadSchema } from "@/lib/validation";

const allowedOrigin = process.env.FRONTEND_URL?.trim();

function getCorsHeaders(origin?: string | null) {
  const normalizedOrigin = origin?.trim();

  if (!allowedOrigin || !normalizedOrigin || normalizedOrigin !== allowedOrigin) {
    return {};
  }

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function withCors(
  response: NextResponse,
  origin?: string | null,
) {
  const headers = getCorsHeaders(origin);

  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export async function OPTIONS(request: NextRequest) {
  return withCors(new NextResponse(null, { status: 204 }), request.headers.get("origin"));
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (allowedOrigin && origin && origin.trim() !== allowedOrigin) {
    return withCors(
      NextResponse.json(
        { success: false, message: "Requests from this origin are not allowed." },
        { status: 403 },
      ),
      origin,
    );
  }

  try {
    const payload = await request.json();
    const parsed = orderPayloadSchema.safeParse(payload);

    if (!parsed.success) {
      return withCors(
        NextResponse.json(
          {
            success: false,
            message: "Please review the checkout form and try again.",
            errors: parsed.error.flatten().fieldErrors,
          },
          { status: 400 },
        ),
        origin,
      );
    }

    const selectedOffer = getOfferBySku(parsed.data.productSku);

    if (!selectedOffer) {
      return withCors(
        NextResponse.json(
          { success: false, message: "The selected product is no longer available." },
          { status: 400 },
        ),
        origin,
      );
    }

    const canonicalPrice = selectedOffer.offerPrice;
    const canonicalTotal = canonicalPrice * parsed.data.quantity;

    if (
      parsed.data.pricePerPiece !== canonicalPrice ||
      parsed.data.totalPrice !== canonicalTotal ||
      parsed.data.productName !== selectedOffer.name
    ) {
      return withCors(
        NextResponse.json(
          {
            success: false,
            message:
              "The product pricing changed while you were ordering. Please refresh and try again.",
          },
          { status: 400 },
        ),
        origin,
      );
    }

    const orderId = generateOrderId();
    const orderDateTime = createOrderTimestamp();
    const order = buildOrderRecord({
      orderId,
      orderDateTime,
      payload: parsed.data,
    });

    await appendOrderToSheet(order, getGoogleSheetHeaders());

    let emailWarning: string | null = null;

    try {
      await sendBusinessOrderEmail(order);
      await sendCustomerOrderEmail(order);
    } catch (emailError) {
      console.error("Email delivery failed after sheet append:", emailError);
      emailWarning =
        "The order was saved to Google Sheets, but email notification is not fully configured yet.";
    }

    return withCors(
      NextResponse.json({
        success: true,
        orderId: order.orderId,
        productName: order.productName,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        emailWarning,
      }),
      origin,
    );
  } catch (error) {
    console.error("Order submission failed:", error);

    return withCors(
      NextResponse.json(
        {
          success: false,
          message:
            "We could not submit your order right now. Please try again in a moment.",
        },
        { status: 500 },
      ),
      origin,
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  appendConsultationLeadToSheet,
  getConsultationSheetHeaders,
} from "@/lib/google-sheets";
import { createConsultationTimestamp } from "@/lib/consultation";
import {
  sendBusinessConsultationEmail,
  sendCustomerConsultationEmail,
} from "@/lib/email";

const consultationSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  email: z.email("Please enter a valid email address."),
  whatsapp: z.string().trim().min(1, "WhatsApp number is required."),
  businessName: z.string().trim().min(1, "Business name is required."),
  website: z.string().trim().min(1, "Website or Facebook page link is required."),
  message: z.string().trim().optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const parsed = consultationSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please review the form and try again.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const lead = {
      submittedAt: createConsultationTimestamp(),
      ...parsed.data,
    };

    await appendConsultationLeadToSheet(lead, getConsultationSheetHeaders());

    let emailWarning: string | null = null;

    try {
      await sendBusinessConsultationEmail(lead);
      await sendCustomerConsultationEmail(lead);
    } catch (error) {
      console.error("Consultation email delivery failed:", error);
      emailWarning =
        "The form was saved to Google Sheets, but email is not configured yet.";
    }

    return NextResponse.json({
      success: true,
      emailWarning,
    });
  } catch (error) {
    console.error("Consultation submission failed:", error);

    const message =
      error instanceof Error
        ? error.message
        : "We could not submit your form right now. Please try again.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 },
    );
  }
}

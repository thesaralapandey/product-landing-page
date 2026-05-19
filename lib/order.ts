import { randomBytes } from "crypto";
import { OrderPayload } from "@/lib/validation";

export type OrderRecord = {
  orderId: string;
  orderDateTime: string;
  customerName: string;
  phoneNumber: string;
  emailAddress: string;
  exactLocation: string;
  productName: string;
  quantity: number;
  pricePerPiece: number;
  totalPrice: number;
  paymentMethod: "Cash On Delivery";
  orderStatus: "New Order";
  notes: string;
};

export function generateOrderId() {
  return `TT-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export function createOrderTimestamp() {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Katmandu",
  }).format(new Date());
}

export function buildOrderRecord({
  orderId,
  orderDateTime,
  payload,
}: {
  orderId: string;
  orderDateTime: string;
  payload: OrderPayload;
}): OrderRecord {
  return {
    orderId,
    orderDateTime,
    customerName: payload.fullName,
    phoneNumber: payload.phoneNumber,
    emailAddress: payload.emailAddress,
    exactLocation: payload.exactLocation,
    productName: payload.productName,
    quantity: payload.quantity,
    pricePerPiece: payload.pricePerPiece,
    totalPrice: payload.totalPrice,
    paymentMethod: "Cash On Delivery",
    orderStatus: "New Order",
    notes: payload.notes ?? "",
  };
}

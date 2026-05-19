import { z } from "zod";

export const orderPayloadSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required"),
  phoneNumber: z.string().trim().min(1, "Phone number is required"),
  emailAddress: z.email("Please enter a valid email address"),
  exactLocation: z.string().trim().min(1, "Location is required"),
  notes: z.string().trim().optional().default(""),
  productSku: z.string().trim().min(1, "Product SKU is required"),
  productName: z.string().trim().min(1, "Product name is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  pricePerPiece: z.number().positive("Price per piece must be valid"),
  totalPrice: z.number().positive("Total price must be valid"),
});

export type OrderPayload = z.infer<typeof orderPayloadSchema>;

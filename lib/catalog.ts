import { productData } from "@/lib/product-data";

export type CheckoutSelection = {
  offer: (typeof productData.offers)[number];
  quantity: number;
  totalPrice: number;
};

function readParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

export function getOfferBySku(sku: string) {
  return productData.offers.find((offer) => offer.sku === sku);
}

export function getCheckoutSelection(
  params: Record<string, string | string[] | undefined>,
): CheckoutSelection {
  const selectedSku = readParam(params, "sku") ?? productData.offers[0].sku;
  const requestedQuantity = Number(readParam(params, "qty") ?? "1");
  const quantity = Number.isFinite(requestedQuantity) && requestedQuantity > 0
    ? Math.floor(requestedQuantity)
    : 1;
  const offer = getOfferBySku(selectedSku) ?? productData.offers[0];

  return {
    offer,
    quantity,
    totalPrice: offer.offerPrice * quantity,
  };
}

export function formatCurrency(amount: number) {
  return `Rs. ${amount}`;
}

export function getCheckoutHref(sku: string, quantity: number) {
  const params = new URLSearchParams({
    sku,
    qty: String(quantity),
  });

  return `/checkout?${params.toString()}`;
}

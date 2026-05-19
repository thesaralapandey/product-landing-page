import { CheckoutForm } from "@/components/checkout-form";
import { getCheckoutSelection } from "@/lib/catalog";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const selection = getCheckoutSelection(params);

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">
            Cash On Delivery Checkout
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            Complete your Twakka Tukka order
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            Your order details are already filled in. Just confirm your contact and location so we can call and deliver fast.
          </p>
        </div>
        <CheckoutForm selection={selection} />
      </div>
    </main>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CheckoutSelection } from "@/lib/catalog";
import { formatCurrency } from "@/lib/utils";

type FormState = {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  exactLocation: string;
  notes: string;
};

export function CheckoutForm({ selection }: { selection: CheckoutSelection }) {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    exactLocation: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          productSku: selection.offer.sku,
          productName: selection.offer.name,
          quantity: selection.quantity,
          pricePerPiece: selection.offer.offerPrice,
          totalPrice: selection.totalPrice,
        }),
      });

      const data = (await response.json()) as {
        message?: string;
        orderId?: string;
        productName?: string;
        quantity?: number;
        totalPrice?: number;
      };

      if (!response.ok) {
        setErrorMessage(
          data.message ?? "We could not submit your order. Please try again.",
        );
        return;
      }

      const params = new URLSearchParams({
        orderId: data.orderId ?? "",
        product: data.productName ?? selection.offer.name,
        quantity: String(data.quantity ?? selection.quantity),
        total: String(data.totalPrice ?? selection.totalPrice),
      });

      router.push(`/thank-you?${params.toString()}`);
    } catch (error) {
      console.error("Checkout submission failed:", error);
      setErrorMessage("We could not submit your order right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.06fr_0.94fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border bg-[var(--surface-strong)] p-6 shadow-[var(--shadow-lg)] sm:p-8"
      >
        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-[var(--ink)]">Full Name</span>
              <input
                required
                value={formState.fullName}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, fullName: event.target.value }))
                }
                className="mt-2 w-full rounded-[1rem] border bg-white px-4 py-3 outline-none transition focus:border-[var(--brand)]"
                placeholder="Enter your full name"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[var(--ink)]">Phone Number</span>
              <input
                required
                value={formState.phoneNumber}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    phoneNumber: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-[1rem] border bg-white px-4 py-3 outline-none transition focus:border-[var(--brand)]"
                placeholder="Enter your phone number"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-[var(--ink)]">Email Address</span>
            <input
              required
              type="email"
              value={formState.emailAddress}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  emailAddress: event.target.value,
                }))
              }
              className="mt-2 w-full rounded-[1rem] border bg-white px-4 py-3 outline-none transition focus:border-[var(--brand)]"
              placeholder="Enter your email address"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[var(--ink)]">Exact Location</span>
            <textarea
              required
              value={formState.exactLocation}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  exactLocation: event.target.value,
                }))
              }
              className="mt-2 min-h-32 w-full rounded-[1rem] border bg-white px-4 py-3 outline-none transition focus:border-[var(--brand)]"
              placeholder="Kindly share your exact location"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[var(--ink)]">Notes</span>
            <textarea
              value={formState.notes}
              onChange={(event) =>
                setFormState((current) => ({ ...current, notes: event.target.value }))
              }
              className="mt-2 min-h-24 w-full rounded-[1rem] border bg-white px-4 py-3 outline-none transition focus:border-[var(--brand)]"
              placeholder="Optional notes for the order"
            />
          </label>
        </div>

        {errorMessage ? (
          <div className="mt-5 rounded-[1rem] border border-[rgba(191,61,27,0.18)] bg-[rgba(255,234,225,0.9)] px-4 py-3 text-sm text-[var(--brand-deep)]">
            {errorMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand),var(--accent))] px-7 py-4 text-base font-semibold text-white shadow-[var(--shadow-lg)] transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Submitting Order..." : "Order Now"}
        </button>
      </form>

      <aside className="space-y-6">
        <div className="rounded-[2rem] border bg-[var(--surface-strong)] p-6 shadow-[var(--shadow-lg)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">
            Order Summary
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
            {selection.offer.name}
          </h2>
          <div className="mt-6 space-y-4 text-sm text-[var(--muted)]">
            <div className="flex items-center justify-between gap-4">
              <span>Product Name</span>
              <span className="text-right font-semibold text-[var(--ink)]">{selection.offer.name}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Quantity</span>
              <span className="font-semibold text-[var(--ink)]">{selection.quantity}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Price Per Piece</span>
              <span className="font-semibold text-[var(--ink)]">
                {formatCurrency(selection.offer.offerPrice)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Total Price</span>
              <span className="font-semibold text-[var(--ink)]">
                {formatCurrency(selection.totalPrice)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Delivery Fee</span>
              <span className="font-semibold text-[var(--leaf)]">Free</span>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border bg-[linear-gradient(180deg,#fff4df,#ffffff)] p-6 shadow-[var(--shadow-sm)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
            Included In Every Order
          </p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
            <p>Cash On Delivery payment method</p>
            <p>Fast order confirmation call</p>
            <p>Freshly prepared street-style food</p>
            <p>Support from {process.env.NEXT_PUBLIC_SITE_URL ? "our team" : "Twakka Tukka"}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

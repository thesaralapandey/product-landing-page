"use client";

import Image from "next/image";
import { useState } from "react";
import { FlodeskInlineForm } from "@/components/flodesk-inline-form";

const faqs = [
  {
    question: "Is the consultation really free?",
    answer:
      "Yes. This is a free 1:1 consultation call for business owners who want more clarity on how to get customers online.",
  },
  {
    question: "Who is this consultation for?",
    answer:
      "It is for Nepal-based business owners who are posting online, boosting posts, or trying digital marketing but are still not getting enough serious inquiries, leads, or sales.",
  },
  {
    question: "What will I get inside the consultation call?",
    answer:
      "You will get a better understanding of what is not working in your current marketing and a simple customized plan you can start using for your business.",
  },
  {
    question: "How long will the consultation call be?",
    answer:
      "The consultation is designed as a focused 1-hour call so we can understand your business properly and give clear next steps.",
  },
  {
    question: "Do I need to have a website before booking the call?",
    answer:
      "No. You can still book even if you only have a Facebook page, Instagram page, or are just starting to build your online presence.",
  },
  {
    question: "What happens after I fill up the form?",
    answer:
      "You will receive the next steps by email, including your appointment link and the details needed to move forward with the consultation.",
  },
  {
    question: "Will you help me create a marketing plan for my business?",
    answer:
      "Yes. The goal of the consultation is to understand your business and give you a customized digital marketing plan you can follow with more confidence.",
  },
];

const processSteps = [
  "Fill up the form",
  "Receive an email with the appointment link",
  "Fill the appointment form",
  "Join the 1:1 consultation call",
  "Get your customized digital marketing plan for FREE",
];

export function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="overflow-hidden">
      <section className="px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="relative rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,252,255,0.94))] px-6 py-14 text-center shadow-[var(--shadow-strong)] sm:px-10 lg:px-16 lg:py-20">
            <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(46,165,242,0.18),transparent_68%)] blur-3xl" />
            <div className="absolute -right-16 top-16 -z-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(126,219,74,0.22),transparent_65%)] blur-3xl" />

            <div className="mx-auto max-w-4xl">
              <p className="inline-flex items-center rounded-full border border-[rgba(46,165,242,0.18)] bg-white/85 px-4 py-2 text-sm font-semibold tracking-[0.14em] text-[var(--brand-navy)] uppercase shadow-[var(--shadow-soft)]">
                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white">
                  <Image
                    src="/logo.png"
                    alt="Marketing Uplift logo"
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 object-contain"
                  />
                </span>
                <span className="text-[12px] font-semibold tracking-[0.16em] text-black">
                  Free 1:1 Digital Marketing Consultation
                </span>
              </p>
              <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--brand-navy)] text-balance sm:text-5xl lg:text-6xl">
                Get More Customers From Online - Not Just Likes &amp; Views
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-black text-balance sm:text-xl">
                <strong>Stop posting without direction.</strong> Get a clear,
                practical digital marketing plan built to turn your online
                presence into <strong>real inquiries, leads, and customers</strong>.
              </p>
              <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-8 text-black sm:text-lg">
                <p>
                  I help business owners <strong>strengthen their brand</strong>,
                  sharpen their message, and use digital marketing with a
                  strategy that is focused on <strong>growth, not guesswork</strong>.
                </p>
                <p>
                  This <strong>free 1:1 consultation</strong> is for businesses
                  that are active online but not seeing the results they deserve.
                  I will review your current marketing, identify what is holding
                  you back, and give you a <strong>customized action plan</strong>
                  tailored to your business.
                </p>
              </div>

              <div className="mx-auto mt-7 max-w-3xl text-left">
                <ul className="grid gap-3 text-base font-medium leading-7 text-black sm:grid-cols-3">
                  {[
                    "Understand what is not working",
                    "Fix weak messaging and targeting",
                    "Get a clear plan to attract buyers",
                  ].map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-black/8 bg-white/80 px-4 py-3 shadow-[var(--shadow-soft)]"
                    >
                      <strong>{item}</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex justify-center">
                <a
                  href="#consultation-form"
                  className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-green))] px-8 py-4 text-base font-semibold text-white shadow-[var(--shadow-button)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Book your FREE call now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border bg-white/88 p-8 shadow-[var(--shadow-medium)] backdrop-blur sm:p-10">
              <p className="text-sm font-semibold tracking-[0.2em] text-[var(--brand-blue)] uppercase">
                If you are a business owner in Nepal
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--brand-navy)] sm:text-4xl">
                You may be working hard online but still not seeing enough real
                customers
              </h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-[var(--muted)]">
                <p>
                  Maybe you are posting on Facebook and Instagram but not getting
                  enough inquiries. Maybe you are boosting posts but still not
                  seeing real sales.
                </p>
                <p>
                  Maybe you are getting random leads but not serious customers.
                  Or maybe your business still depends too much on referrals and
                  word of mouth because digital marketing feels confusing.
                </p>
                <p>
                  Ads, content, landing pages, follow-up - it can all feel messy
                  when you do not know what strategy is actually right for your
                  business.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border bg-[linear-gradient(180deg,rgba(46,165,242,0.08),rgba(126,219,74,0.12))] p-8 shadow-[var(--shadow-medium)] sm:p-10">
              <p className="text-sm font-semibold tracking-[0.2em] text-[var(--brand-green-deep)] uppercase">
                Here is what this free consultation will do
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--brand-navy)] sm:text-4xl">
                Clear the confusion and show you the next right steps
              </h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-[var(--muted)]">
                <p>
                  In this free consultation call, I will understand your
                  business, identify what is not working, and show you where your
                  marketing can improve.
                </p>
                <p>
                  You will leave with a clear digital marketing plan that you can
                  start implementing immediately to improve leads, customers, and
                  sales.
                </p>
              </div>

              <div className="mt-8 grid gap-4">
                {[
                  "Clear direction instead of random posting",
                  "Simple strategy for your business, not generic advice",
                  "Focused on leads, customers, and sales",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border bg-white/92 px-5 py-4 shadow-[var(--shadow-soft)]"
                  >
                    <p className="text-sm font-medium text-[var(--brand-navy)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] border bg-white/90 p-8 shadow-[var(--shadow-medium)] sm:p-10 lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-[var(--brand-blue)] uppercase">
              Consultation process
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--brand-navy)] sm:text-4xl">
              How The Free Consultation Works
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {processSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-[1.5rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,251,255,0.98))] p-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-green))] font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-base font-medium leading-7 text-[var(--brand-navy)]">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-[var(--brand-blue)] uppercase">
              FAQ
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--brand-navy)] sm:text-4xl">
              Questions business owners usually ask first
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="rounded-[1.4rem] border bg-white/92 p-5 shadow-[var(--shadow-soft)]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq((current) => (current === index ? null : index))
                    }
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-lg font-semibold text-[var(--brand-navy)]">
                      {faq.question}
                    </span>
                    <span className="text-2xl font-light text-[var(--brand-blue)]">
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>
                  {isOpen ? (
                    <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                      {faq.answer}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="consultation-form"
        className="px-4 pb-16 pt-14 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border bg-[var(--brand-navy)] p-8 text-white shadow-[var(--shadow-strong)] sm:p-10">
              <p className="text-sm font-semibold tracking-[0.2em] text-white/65 uppercase">
                Book your consultation
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/12 backdrop-blur">
                  <Image
                    src="/logo.png"
                    alt="Marketing Uplift logo"
                    width={34}
                    height={34}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
                  Book Your FREE 1:1 Consultation Call
                </h2>
              </div>
              <p className="mt-5 text-base leading-7 text-white/78">
                Fill up the form below and we&apos;ll contact you with the next
                steps.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Your lead stays inside Flodesk",
                  "Flodesk automation still triggers after submission",
                  "Safe redirect to the thank-you page after success",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4"
                  >
                    <p className="text-sm leading-6 text-white/88">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border bg-white/94 p-4 shadow-[var(--shadow-strong)] backdrop-blur sm:p-6 lg:p-8">
              <FlodeskInlineForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

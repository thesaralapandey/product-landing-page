import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <div className="rounded-full border border-white/70 bg-white/85 px-4 py-2 shadow-[0_12px_30px_rgba(18,48,77,0.08)] backdrop-blur">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Marketing Uplift logo"
                width={42}
                height={42}
                className="h-10 w-10"
                priority
              />
              <div>
                <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.24em] text-[var(--brand-navy)] uppercase">
                  Marketing Uplift
                </p>
                <p className="text-xs text-[var(--muted)]">
                  Empowering Growth Through Smart Marketing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid items-center gap-10 pb-14 pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:pb-20 lg:pt-8">
          <div>
            <div className="inline-flex items-center rounded-full border border-[rgba(43,160,244,0.18)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--brand-navy)] shadow-[0_10px_30px_rgba(18,48,77,0.06)]">
              Free 1:1 Digital Marketing Consultation
            </div>
            <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--brand-navy)] text-balance sm:text-5xl lg:text-6xl">
              Get More Customers From Online, Not Just Likes and Views
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)] text-balance sm:text-xl">
              Stop guessing what to post. Get a clear marketing plan designed to
              bring real customers to your business.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)]">
              In this free 1:1 consultation, I will review your current online
              marketing and give you a simple customized plan for your business.
            </p>
            <div className="mt-6 grid max-w-2xl gap-3 text-sm text-[var(--brand-navy)] sm:grid-cols-3">
              {[
                "Free 1:1 consultation",
                "Custom plan for your business",
                "Focused on getting more customers",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border bg-white/80 px-4 py-3 shadow-[0_10px_24px_rgba(18,48,77,0.04)]"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#cta-form"
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-green))] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(43,160,244,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Book Free Consultation
              </a>
              <p className="text-sm text-[var(--muted)]">
                Customized Strategy for Your Business
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[linear-gradient(145deg,rgba(43,160,244,0.1),rgba(125,220,73,0.1))] blur-2xl" />
            <div className="rounded-[2rem] border border-white/80 bg-[var(--surface)] p-6 shadow-[var(--shadow)] backdrop-blur xl:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Know exactly what to post to get customers",
                  "Clear strategy for Facebook and Instagram",
                  "Fix what is not working in your marketing",
                  "Simple plan you can follow or outsource",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border bg-white/85 p-5 shadow-[0_12px_28px_rgba(18,48,77,0.05)]"
                  >
                    <div className="mb-3 h-2 w-14 rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-green))]" />
                    <p className="text-sm font-medium leading-6 text-[var(--brand-navy)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-[var(--brand-navy)] px-5 py-4 text-white">
                <p className="text-sm font-medium text-white/70">
                  One clear goal
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold">
                  Turn your online presence into customer growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

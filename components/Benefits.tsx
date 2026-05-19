const benefits = [
  "Know exactly what to post to get customers",
  "Clear strategy for Facebook and Instagram",
  "Fix what is not working in your marketing",
  "Simple plan you can follow or outsource",
];

export function Benefits() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border bg-white/88 p-8 shadow-[var(--shadow)] backdrop-blur lg:p-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.22em] text-[var(--brand-blue)] uppercase">
              What you will get
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--brand-navy)] sm:text-4xl">
              Clear next steps for your online marketing
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,251,255,0.98))] p-6 shadow-[0_12px_28px_rgba(18,48,77,0.05)]"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-3 w-3 rounded-full bg-[var(--brand-green)]" />
                  <p className="text-base leading-7 text-[var(--brand-navy)]">
                    {benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.75rem] bg-[var(--brand-navy)] p-6 text-white lg:flex lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium tracking-[0.22em] text-white/60 uppercase">
                Book the call
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold">
                1:1 Consultation
              </h3>
              <p className="mt-2 text-white/75">
                Customized Strategy for Your Business
              </p>
            </div>
            <a
              href="#cta-form"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-navy)] transition-transform duration-200 hover:-translate-y-0.5 lg:mt-0"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

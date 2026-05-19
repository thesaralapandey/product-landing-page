export function Urgency() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border bg-[linear-gradient(135deg,rgba(43,160,244,0.12),rgba(125,220,73,0.14))] p-8 text-center shadow-[var(--shadow)] lg:p-10">
          <p className="text-sm font-semibold tracking-[0.22em] text-[var(--brand-blue)] uppercase">
            Limited availability
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--brand-navy)] sm:text-4xl">
            Free consultation spots are limited
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
            I keep these consultations limited so each business gets proper
            attention. Book your free 1:1 consultation before the current spots
            fill up.
          </p>
          <a
            href="#cta-form"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-green))] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(43,160,244,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Book Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}

export function Problem() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border bg-white/88 p-8 shadow-[var(--shadow)] backdrop-blur">
            <p className="text-sm font-semibold tracking-[0.22em] text-[var(--brand-blue)] uppercase">
              If this sounds familiar
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--brand-navy)] sm:text-4xl">
              You are showing up online, but not getting enough customers
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--muted)]">
              Maybe you are posting on Facebook or Instagram but you are still
              unsure what is actually working. Likes and views alone do not grow
              a business if they are not turning into real inquiries and sales.
            </p>
            <p className="mt-5 text-base leading-7 text-[var(--muted)]">
              This consultation helps you understand what to improve, what to
              stop doing, and what to focus on next so your marketing feels more
              clear and effective.
            </p>
          </div>

          <div className="rounded-[2rem] border bg-[linear-gradient(180deg,rgba(43,160,244,0.08),rgba(125,220,73,0.1))] p-8 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold tracking-[0.22em] text-[var(--brand-green)] uppercase">
              How the consultation works
            </p>
            <div className="mt-6 grid gap-4">
              {[
                {
                  step: "Step 1",
                  text: "You book the call and share your business details.",
                },
                {
                  step: "Step 2",
                  text: "We review your current marketing and identify what is working and what is not.",
                },
                {
                  step: "Step 3",
                  text: "You get a simple customized plan for your business.",
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="flex gap-4 rounded-2xl border bg-white/92 p-5 shadow-[0_12px_28px_rgba(18,48,77,0.05)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-green))] font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--brand-navy)]">
                      {item.step}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

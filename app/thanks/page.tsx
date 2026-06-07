import Image from "next/image";
import { VimeoLitePlayer } from "@/components/vimeo-lite-player";

export default function ThanksPage() {
  return (
    <main className="flex min-h-screen items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl rounded-[2rem] border border-white/80 bg-white/92 p-6 text-center shadow-[var(--shadow-strong)] backdrop-blur sm:p-10 lg:p-12">
        <Image
          src="/logo.png"
          alt="Marketing Uplift logo"
          width={120}
          height={120}
          className="mx-auto h-auto w-[84px] sm:w-[96px]"
          priority
        />
        <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-[var(--brand-blue)] uppercase">
          Thank you
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--brand-navy)] sm:text-5xl">
          Wait... watch this video before you go
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Before your consultation, please watch this short video so you know
          what to do next.
        </p>

        <VimeoLitePlayer />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            "We review your submitted business details",
            "We contact you by email or WhatsApp",
            "You receive the next steps for the consultation",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1.4rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,251,255,0.98))] p-5 shadow-[var(--shadow-soft)]"
            >
              <p className="text-sm leading-6 text-[var(--brand-navy)]">
                {item}
              </p>
            </div>
          ))}
        </div>

        <a
          href="https://wa.me/9840034653"
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-green))] px-8 py-4 text-base font-semibold text-white shadow-[var(--shadow-button)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Chat with me on WhatsApp
        </a>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const FLODESK_EMBED_PATH = "/flodesk-consultation-form.html";
const FLODESK_ROOT_SELECTOR = ".ff-6a224b459f6c985b6f9122fa[data-ff-el='root']";

export function FlodeskInlineForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    let observer: MutationObserver | undefined;
    let cancelled = false;
    let redirected = false;

    const loadFlodeskForm = async () => {
      if (!container) {
        return;
      }

      const response = await fetch(FLODESK_EMBED_PATH, { cache: "no-store" });
      const html = await response.text();

      if (cancelled) {
        return;
      }

      container.innerHTML = html;

      const scripts = Array.from(container.querySelectorAll("script"));

      scripts.forEach((oldScript) => {
        const script = document.createElement("script");

        Array.from(oldScript.attributes).forEach((attribute) => {
          script.setAttribute(attribute.name, attribute.value);
        });

        script.text = oldScript.textContent ?? "";
        oldScript.replaceWith(script);
      });

      const root = container.querySelector(FLODESK_ROOT_SELECTOR);

      if (!root) {
        return;
      }

      const syncButtonLabel = () => {
        const buttonLabel = container.querySelector("[data-draw-element='editable']");

        if (buttonLabel && buttonLabel.textContent?.trim() !== "Book Free Call") {
          buttonLabel.textContent = "Book Free Call";
        }
      };

      const redirectAfterSuccess = () => {
        if (root.getAttribute("data-ff-stage") !== "success" || redirected) {
          return;
        }

        redirected = true;

        window.setTimeout(() => {
          router.push("/thanks");
        }, 3000);
      };

      syncButtonLabel();

      observer = new MutationObserver(() => {
        syncButtonLabel();
        redirectAfterSuccess();
      });
      observer.observe(root, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ["data-ff-stage"],
      });

      redirectAfterSuccess();
    };

    void loadFlodeskForm();

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [router]);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--brand-navy)]">
          Book Your FREE 1:1 Consultation Call
        </h3>
        <p className="mt-3 text-base leading-7 text-[var(--muted)]">
          Share your details. We&apos;ll send the next steps.
        </p>
      </div>
      <div
        className="marketing-flodesk-shell min-h-[380px]"
        ref={containerRef}
        aria-live="polite"
      />
    </div>
  );
}

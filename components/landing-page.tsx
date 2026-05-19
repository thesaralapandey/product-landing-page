"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

type FormValues = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  website: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  whatsapp: "",
  businessName: "",
  website: "",
  message: "",
};

export function LandingPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = (formValues: FormValues) => {
    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formValues.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!formValues.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!emailPattern.test(formValues.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.whatsapp.trim()) {
      nextErrors.whatsapp = "Please enter your WhatsApp number.";
    }

    if (!formValues.businessName.trim()) {
      nextErrors.businessName = "Please enter your business name.";
    }

    if (!formValues.website.trim()) {
      nextErrors.website = "Please enter your website or Facebook page link.";
    }

    return nextErrors;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !data.success) {
        setSubmitError(
          data.message ?? "We could not submit your form right now.",
        );
        return;
      }

      router.push("/thanks");
    } catch (error) {
      console.error("Consultation form submission failed:", error);
      setSubmitError("We could not submit your form right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="overflow-hidden">
      <section className="px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="flex justify-center">
            <div className="rounded-[1.75rem] border border-white/70 bg-white/80 px-6 py-4 shadow-[var(--shadow-soft)] backdrop-blur">
              <Image
                src="/logo.png"
                alt="Marketing Uplift logo"
                width={170}
                height={170}
                className="mx-auto h-auto w-[96px] sm:w-[112px]"
                priority
              />
            </div>
          </header>

          <div className="relative mt-8 rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,252,255,0.94))] px-6 py-14 text-center shadow-[var(--shadow-strong)] sm:px-10 lg:px-16 lg:py-20">
            <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(46,165,242,0.18),transparent_68%)] blur-3xl" />
            <div className="absolute -right-16 top-16 -z-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(126,219,74,0.22),transparent_65%)] blur-3xl" />

            <div className="mx-auto max-w-4xl">
              <p className="inline-flex items-center rounded-full border border-[rgba(46,165,242,0.18)] bg-white/85 px-4 py-2 text-sm font-semibold tracking-[0.14em] text-[var(--brand-navy)] uppercase shadow-[var(--shadow-soft)]">
                Free 1:1 Digital Marketing Consultation
              </p>
              <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--brand-navy)] text-balance sm:text-5xl lg:text-6xl">
                Get More Customers From Online - Not Just Likes &amp; Views
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)] text-balance sm:text-xl">
                Stop posting randomly. Get a clear plan that actually brings
                customers.
              </p>
              <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-8 text-[var(--muted)] sm:text-lg">
                <p>
                  I help businesses level up their brand online through smart
                  digital marketing strategies.
                </p>
                <p>
                  This free 1:1 consultation is designed for business owners who
                  are not getting proper results online. During the consultation,
                  I will analyze your current marketing and provide a customized
                  marketing plan tailored specifically for your business -
                  completely free.
                </p>
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
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
                Book Your FREE 1:1 Consultation Call
              </h2>
              <p className="mt-5 text-base leading-7 text-white/78">
                Fill up the form below and we&apos;ll contact you with the next
                steps.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Built for Nepal-based business owners who want more customers",
                  "Simple and practical advice based on your actual business",
                  "Customized marketing plan shared with you for free",
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

            <div className="rounded-[2rem] border bg-white/94 p-8 shadow-[var(--shadow-strong)] backdrop-blur sm:p-10">
              <form noValidate onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="Full Name"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={values.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    required
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="WhatsApp Number"
                    name="whatsapp"
                    placeholder="Enter your WhatsApp number"
                    value={values.whatsapp}
                    onChange={handleChange}
                    error={errors.whatsapp}
                    required
                  />
                  <FormField
                    label="Business Name"
                    name="businessName"
                    placeholder="Enter your business name"
                    value={values.businessName}
                    onChange={handleChange}
                    error={errors.businessName}
                    required
                  />
                </div>

                <FormField
                  label="Website or Facebook Page Link"
                  name="website"
                  placeholder="Paste your website or Facebook page link"
                  value={values.website}
                  onChange={handleChange}
                  error={errors.website}
                  required
                />

                <FormTextArea
                  label="Message for Us"
                  name="message"
                  placeholder="Share anything important about your business"
                  value={values.message}
                  onChange={handleChange}
                  error={errors.message}
                />

                {submitError ? (
                  <div className="rounded-[1.1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-green))] px-7 py-4 text-base font-semibold text-white shadow-[var(--shadow-button)] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit & Book My Free Call"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

type SharedFieldProps = {
  label: string;
  name: keyof FormValues;
  placeholder: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
  required?: boolean;
};

function FormField({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  required,
  type = "text",
}: SharedFieldProps & { type?: React.HTMLInputTypeAttribute }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[var(--brand-navy)]">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-[1.2rem] border bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--brand-blue)] focus:ring-4 focus:ring-[rgba(46,165,242,0.12)]"
      />
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </label>
  );
}

function FormTextArea({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
}: SharedFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[var(--brand-navy)]">
        {label}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-[1.2rem] border bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--brand-blue)] focus:ring-4 focus:ring-[rgba(46,165,242,0.12)]"
      />
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </label>
  );
}

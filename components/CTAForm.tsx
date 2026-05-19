"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

export function CTAForm() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (formValues: FormValues) => {
    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formValues.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!formValues.email.trim()) {
      nextErrors.email = "Please enter your active email.";
    } else if (!emailPattern.test(formValues.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.whatsapp.trim()) {
      nextErrors.whatsapp = "Please enter your WhatsApp number.";
    }

    if (!formValues.businessName.trim()) {
      nextErrors.businessName = "Please enter your business name.";
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
    await new Promise((resolve) => setTimeout(resolve, 700));
    router.push("/thank-you");
  };

  return (
    <section id="cta-form" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border bg-[var(--brand-navy)] p-8 text-white shadow-[var(--shadow)] lg:p-10">
            <p className="text-sm font-semibold tracking-[0.22em] text-white/60 uppercase">
              Book the call
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
              1:1 Consultation
            </h2>
            <p className="mt-4 text-base leading-7 text-white/78">
              Customized Strategy for Your Business
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Free 1:1 digital marketing consultation call",
                "Simple customized plan for your business",
                "Focused on helping you get more customers online",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm leading-6 text-white/86">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border bg-white/92 p-8 shadow-[var(--shadow)] backdrop-blur lg:p-10">
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
                  label="Active Email"
                  name="email"
                  type="email"
                  placeholder="Enter your active email"
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
                label="Website / Facebook URL"
                name="website"
                placeholder="Add your website or Facebook page"
                value={values.website}
                onChange={handleChange}
                error={errors.website}
              />

              <FormTextArea
                label="Anything you want to say"
                name="message"
                placeholder="Tell me a little about your business or goals"
                value={values.message}
                onChange={handleChange}
                error={errors.message}
              />

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-green))] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(43,160,244,0.28)] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {isSubmitting ? "Submitting..." : "Book Free Consultation"}
                </button>
                <p className="text-center text-sm text-[var(--muted)]">
                  We respect your privacy. No spam.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
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
        className="w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--brand-blue)] focus:ring-4 focus:ring-[rgba(43,160,244,0.12)]"
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
        className="w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--brand-blue)] focus:ring-4 focus:ring-[rgba(43,160,244,0.12)]"
      />
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </label>
  );
}

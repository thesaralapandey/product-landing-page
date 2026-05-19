import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const metadataBase =
  process.env.NEXT_PUBLIC_SITE_URL &&
  /^https?:\/\//.test(process.env.NEXT_PUBLIC_SITE_URL)
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL("https://example.com");

export const metadata: Metadata = {
  metadataBase,
  title: "Marketing Uplift | Free 1:1 Digital Marketing Consultation",
  description:
    "Book a free 1:1 digital marketing consultation and get a customized marketing plan for your business.",
  openGraph: {
    title: "Get More Customers From Online - Not Just Likes & Views",
    description:
      "Stop posting randomly. Get a clear plan that actually brings customers.",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Marketing Uplift logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get More Customers From Online - Not Just Likes & Views",
    description:
      "Free 1:1 digital marketing consultation for Nepal-based business owners.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${dmSans.variable} bg-[var(--bg)] text-[var(--foreground)] antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev. John — Freelance Web Developer",
  description:
    "Dev. John — freelance web developer based in the Philippines. Website development, maintenance, booking systems and local SEO for clients worldwide.",
  keywords: [
    "freelance web developer",
    "website development",
    "booking systems",
    "local SEO",
    "Philippines",
    "Dev. John",
  ],
  authors: [{ name: "Dev. John" }],
  openGraph: {
    title: "Dev. John — Freelance Web Developer",
    description:
      "Freelance web developer based in the Philippines. Building fast, maintainable websites and booking systems for clients worldwide.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b080c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased`}
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

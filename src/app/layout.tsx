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

const siteUrl = "https://www.johnrish.site";
const siteName = "Dev. John — Freelance Web Developer";
const description =
  "Dev. John — freelance web developer based in the Philippines. Website development, maintenance, booking systems and local SEO for clients worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Dev. John",
  },
  description,
  keywords: [
    "freelance web developer",
    "website development",
    "booking systems",
    "local SEO",
    "Philippines web developer",
    "Dev. John",
    "John Rish Ladica",
  ],
  authors: [{ name: "Dev. John", url: siteUrl }],
  creator: "Dev. John",
  publisher: "Dev. John",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: siteName,
    description:
      "Freelance web developer based in the Philippines. Building fast, maintainable websites and booking systems for clients worldwide.",
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dev. John — Freelance Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "Freelance web developer based in the Philippines. Building fast, maintainable websites and booking systems for clients worldwide.",
    images: ["/og-image.png"],
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b080c",
};

// JSON-LD structured data: Person + WebSite, for search (SEO), rich results
// and question-answering / generative engines (AEO/GEO).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Dev. John",
      alternateName: "John Rish Ladica",
      url: siteUrl,
      image: `${siteUrl}/og-image.png`,
      jobTitle: "Freelance Web Developer",
      description,
      email: "mailto:hugesmil3@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PH",
      },
      sameAs: [
        "https://ph.linkedin.com/in/john-rish-ladica-ba53123b9",
        "https://www.github.com/johnr1sh",
      ],
      knowsAbout: [
        "Web Development",
        "Website Maintenance",
        "Booking Systems",
        "Local SEO",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description,
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: siteName,
      about: { "@id": `${siteUrl}/#person` },
      isPartOf: { "@id": `${siteUrl}/#website` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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

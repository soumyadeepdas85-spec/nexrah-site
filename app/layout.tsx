import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexrah.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "NexRah — Marketing & Creative Agency in Noida | Bridging Beyond Next",
  description:
    "NexRah is a Noida-based marketing and creative agency: performance marketing, SEO & AI search, social, branding, packaging, events, real estate media and video production.",
  openGraph: {
    title: "NexRah — Bridging Beyond Next",
    description:
      "Performance marketing, content and creative production from Noida, Uttar Pradesh.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#17171c" },
  ],
};

// Sets theme + js flag before first paint to avoid a flash.
const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('nexrah-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "NexRah",
  slogan: "Bridging Beyond Next",
  url: siteUrl,
  areaServed: "IN",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-theme="light"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

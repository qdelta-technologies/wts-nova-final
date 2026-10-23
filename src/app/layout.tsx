import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { brandInstagram, businessEmail, businessTelephone, founderInstagram, siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site-config";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});
const editorialSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  applicationName: siteName,
  creator: siteName,
  publisher: siteName,
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName,
    locale: "en_IN",
    type: "website",
    ...(siteUrl ? {
      url: siteUrl,
      images: [{ url: `${siteUrl}/images/wts-nova-og.png`, width: 1200, height: 630, alt: "WTS Nova — social media, content, and digital marketing in Nalgonda, Telangana" }],
    } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    ...(siteUrl ? { images: [`${siteUrl}/images/wts-nova-og.png`] } : {}),
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: siteName,
      inLanguage: "en-IN",
      ...(siteUrl ? { "@id": `${siteUrl}/#website`, url: siteUrl } : {}),
    },
    {
      "@type": "ProfessionalService",
      name: siteName,
      description: siteDescription,
      email: businessEmail,
      telephone: businessTelephone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nalgonda",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "City", name: "Nalgonda" },
        { "@type": "State", name: "Telangana" },
      ],
      serviceType: [
        "Social media management",
        "Content creation",
        "Social media marketing and strategy",
        "Online presence and growth solutions",
      ],
      sameAs: [brandInstagram],
      founder: { "@type": "Person", name: "Shaik Abdul Wahab", sameAs: founderInstagram },
      ...(siteUrl ? {
        "@id": `${siteUrl}/#business`,
        url: siteUrl,
        image: `${siteUrl}/images/wts-nova-og.png`,
        logo: `${siteUrl}/images/wts-nova-logo-nav.webp`,
      } : {}),
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B1933",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${instrumentSerif.variable} ${editorialSerif.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}

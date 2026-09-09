import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const arabic = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2",
      weight: "600",
    },
  ],
  variable: "--font-arabic",
  display: "swap",
});
const siteUrl = "https://masbak.co/";
const title = "مَسبَك | بناء الكيانات والتحويل التشغيلي في السعودية";
const description =
  "مَسبَك شركة بناء وتحويل تشغيلي سعودية. نصمم نموذج العمل، نبني الفريق والأنظمة والعمليات، ونطلق التشغيل ثم ننقل كيانًا قادرًا على الاستمرار والنمو.";
const brandImage = "https://masbak.co/brand/asset-0.png";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    siteName: "مَسبَك",
    locale: "ar_SA",
    images: [{ url: brandImage, alt: "مَسبَك" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [brandImage],
  },
  icons: {
    icon: "/brand/FAV_ICON.png",
    shortcut: "/brand/FAV_ICON.png",
    apple: "/brand/FAV_ICON.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}#organization`,
                  name: "مَسبَك",
                  url: siteUrl,
                  description,
                  logo: brandImage,
                  email: "m.alhamed@masbak.sa",
                  sameAs: ["https://www.linkedin.com/company/masbak/"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}#website`,
                  name: "مَسبَك",
                  url: siteUrl,
                  inLanguage: "ar",
                  publisher: { "@id": `${siteUrl}#organization` },
                },
                {
                  "@type": "WebPage",
                  "@id": `${siteUrl}#webpage`,
                  url: siteUrl,
                  name: title,
                  description,
                  inLanguage: "ar",
                  isPartOf: { "@id": `${siteUrl}#website` },
                  about: { "@id": `${siteUrl}#organization` },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={arabic.variable}>{children}</body>
    </html>
  );
}

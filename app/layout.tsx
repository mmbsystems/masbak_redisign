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
export const metadata: Metadata = {
  title: "مَسبَك | نبني محليًا. ونُشغّل عالميًا.",
  description:
    "مَسبَك شركة بناء وتحويل تشغيلي سعودية. نحوّل الاستراتيجيات والفرص إلى كيانات قادرة على التشغيل والنمو.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={arabic.variable}>{children}</body>
    </html>
  );
}

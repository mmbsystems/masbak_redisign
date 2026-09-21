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
// Only site-wide defaults belong here; page identities are route-specific.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.masbak.co/"),
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
      <body className={arabic.variable}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";

export const siteUrl = "https://www.masbak.co/";
const title = "مَسبَك | Masbak — بناء الكيانات والتحويل التشغيلي";
const description =
  "مَسبَك (Masbak) شركة سعودية متخصصة في بناء الكيانات والتحويل التشغيلي والتطوير التنظيمي، وتصميم نماذج التشغيل وبناء الفرق والعمليات وتمكين الكيانات من النمو والاستقلال.";
const brandImage = `${siteUrl}brand/asset-0.png`;
export const homepageMetadata: Metadata = {
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
};

// Homepage-only graph: future routes must define their own page identity.
export const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "مَسبَك",
      alternateName: ["مسبك", "Masbak"],
      url: siteUrl,
      description: "مَسبَك شركة بناء وتحويل تشغيلي سعودية. نصمم نموذج العمل، نبني الفريق والأنظمة والعمليات، ونطلق التشغيل ثم ننقل كيانًا قادرًا على الاستمرار والنمو.",
      logo: brandImage,
      email: "m.alhamed@masbak.sa",
      sameAs: ["https://www.linkedin.com/company/masbak/"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      name: "مَسبَك",
      alternateName: ["مسبك", "Masbak"],
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
};

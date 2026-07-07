import { siteContact } from "@/lib/siteContact";
import { ogImage, siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/logo/logo.svg`,
        description: siteDescription,
        email: siteContact.email,
        telephone: siteContact.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteContact.street,
          addressLocality: "Hermosillo",
          addressRegion: "Sonora",
          postalCode: "83100",
          addressCountry: "MX",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "es-MX",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: siteTitle,
        description: siteDescription,
        isPartOf: { "@id": `${siteUrl}/#website` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}${ogImage}` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
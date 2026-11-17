// app/interior-designers/layout.js

import InteriorNavbar from "../_components/interior-growth-partner-components/InteriorNav";

export const metadata = {
  title:
    "Digital Marketing Agency for Interior Designers in Bangalore | SharpXstudios",

  description:
    "Grow your interior design business with website design, local SEO, Google Business Profile optimisation, Google Ads, social media marketing and AI lead generation in Bangalore. Get more qualified interior design enquiries with SharpXstudios.",

  keywords: [
    "digital marketing for interior designers in Bangalore",
    "interior design marketing agency Bangalore",
    "digital marketing agency for architects",
    "website design for interior designers",
    "interior designer SEO services Bangalore",
    "SEO for interior designers",
    "Google Ads for interior designers",
    "social media marketing for interior designers",
    "lead generation for interior designers",
    "Google Business Profile optimisation",
    "interior design website development",
    "marketing agency for architects in Bangalore",
    "interior design business growth",
    "AI lead automation for interior designers",
  ],

  alternates: {
    canonical: "https://www.sharpxstudios.com/interior-designers",
  },

  openGraph: {
    title:
      "Digital Marketing for Interior Designers in Bangalore | SharpXstudios",

    description:
      "Get more interior design enquiries with a high-converting website, local SEO, Google Ads, social media marketing and AI lead automation.",

    url: "https://www.sharpxstudios.com/interior-designers",
    siteName: "SharpXstudios",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Digital Marketing for Interior Designers in Bangalore | SharpXstudios",
    description:
      "Website design, SEO, Google Ads and AI lead generation for interior designers and architects in Bangalore.",
  },
};

export default function InteriorDesignersLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SharpXstudios",
    url: "https://www.sharpxstudios.com/interior-designers",

    description:
      "SharpXstudios helps interior designers and architects in Bangalore grow through website design, SEO, Google Business Profile optimisation, Google Ads, social media marketing, lead generation and AI lead automation.",

    areaServed: {
      "@type": "City",
      name: "Bangalore",
    },

    address: {
      "@type": "PostalAddress",
      addressLocality: "RR Nagar, Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },

    serviceType: [
      "Digital Marketing for Interior Designers",
      "Website Design",
      "SEO",
      "Google Ads",
      "Social Media Marketing",
      "Lead Generation",
      "AI Lead Automation",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <InteriorNavbar />

      {children}
    </>
  );
}

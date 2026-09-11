import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import AnimatedCursor from "react-animated-cursor";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
});

const siteUrl = "https://www.sharpxstudios.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    /*
    |--------------------------------------------------------------------------
    | Core Organization Entity
    |--------------------------------------------------------------------------
    */
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "SharpXstudios",
      legalName: "SharpXstudios",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        url: `${siteUrl}/logo.png`,
        contentUrl: `${siteUrl}/logo.png`,
        caption: "SharpXstudios Logo",
      },
      image: {
        "@id": `${siteUrl}/#logo`,
      },
      foundingDate: "2026",
      slogan: "Built to perform, not just look good.",
      description:
        "SharpXstudios is a digital agency headquartered in Bangalore specializing in custom web development, AI automation workflows, UI/UX design, and generative search optimization.",
      founder: {
        "@type": "Person",
        name: "Sharan P",
        jobTitle: "Founder",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      foundingLocation: {
        "@type": "Place",
        name: "Bangalore",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bangalore",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
      },
      areaServed: [
        {
          "@type": "City",
          name: "Bangalore",
        },
        {
          "@type": "AdministrativeArea",
          name: "Rajarajeshwari Nagar (RR Nagar)",
        },
        {
          "@type": "Place",
          name: "West Bangalore",
        },
        {
          "@type": "Country",
          name: "India",
        },
      ],
      sameAs: [
        "https://www.instagram.com/sharpxstudios",
        "https://www.linkedin.com/company/sharpxstudios",
      ],
      knowsAbout: [
        "Web Development",
        "Next.js",
        "React",
        "AI Automation",
        "Artificial Intelligence Agents",
        "UI/UX Design",
        "Digital Marketing",
        "Search Engine Optimization (SEO)",
        "Answer Engine Optimization (AEO)",
        "Generative Engine Optimization (GEO)",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-8050923077",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Kannada", "Hindi"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Core Digital Engineering Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": `${siteUrl}/#web-development`,
              name: "Web Development Services",
              serviceType: "Web Development",
              description:
                "Custom Next.js and React web applications engineered for speed, performance, and search visibility.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": `${siteUrl}/#ai-automation`,
              name: "AI Automation & Workflow Solutions",
              serviceType: "AI Automation",
              description:
                "Business process automation using autonomous AI agents, workflow integration, and customized machine learning tools.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": `${siteUrl}/#seo-geo`,
              name: "SEO, AEO & GEO Services",
              serviceType: "Generative Engine Optimization",
              description:
                "Advanced optimization strategies targeting traditional search engines and AI generative engines like ChatGPT and Perplexity.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": `${siteUrl}/#ui-ux`,
              name: "UI/UX Product Design",
              serviceType: "UI/UX Design",
              description:
                "User experience architectures and dynamic UI systems engineered for user engagement and accessibility.",
            },
          },
        ],
      },
    },

    /*
    |--------------------------------------------------------------------------
    | WebSite Entity
    |--------------------------------------------------------------------------
    */
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "SharpXstudios",
      description:
        "SharpXstudios is a web development and AI automation agency serving clients in Bangalore and globally.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-IN",
    },

    /*
    |--------------------------------------------------------------------------
    | Primary WebPage Entity
    |--------------------------------------------------------------------------
    */
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Web Development & AI Automation Agency in Bangalore | SharpXstudios",
      headline: "Fast, Intelligent Websites & AI Automation Built to Perform",
      description:
        "SharpXstudios builds high-performance web systems, custom AI automations, and GEO strategies for modern enterprises.",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-IN",
    },
  ],
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Web Development & AI Automation Agency in RR Nagar Bangalore | SharpXstudios",
    template: "%s | SharpXstudios",
  },
  description:
    "SharpXstudios is a web development and AI automation agency in RR Nagar, Bangalore. We build high-performance websites, AI automation systems, SEO and digital marketing solutions for businesses.",
  keywords: [
    "SharpXstudios",
    "web development agency in RR Nagar",
    "web development agency in RR Nagar Bangalore",
    "web development company in RR Nagar",
    "web development company in RR Nagar Bangalore",
    "website development agency in RR Nagar",
    "website design agency in RR Nagar",
    "custom website development RR Nagar",
    "Next.js development RR Nagar",
    "React development RR Nagar",
    "AI agency in RR Nagar",
    "AI automation agency in Bangalore",
    "AI agents for business Bangalore",
    "digital marketing agency in RR Nagar",
    "SEO agency in RR Nagar",
    "UI UX design agency Bangalore",
    "AEO agency Bangalore",
    "GEO agency Bangalore",
  ],
  authors: [
    {
      name: "Sharan P",
    },
  ],
  creator: "SharpXstudios",
  publisher: "SharpXstudios",
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
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "SharpXstudios",
    title:
      "Web Development & AI Automation Agency in RR Nagar Bangalore | SharpXstudios",
    description:
      "Web development, AI automation, SEO and digital marketing services for businesses in RR Nagar and across Bangalore.",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SharpXstudios - Web Development & AI Automation Agency",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Web Development & AI Automation Agency in RR Nagar Bangalore | SharpXstudios",
    description:
      "Web development, AI automation, SEO and digital marketing services for businesses in RR Nagar and Bangalore.",
    images: ["/assets/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      </head>
      <body
        className={`${jakarta.className} ${dmSans.className} overflow-x-hidden bg-gray-50`}
      >
        <AnimatedCursor
          innerSize={12}
          outerSize={48}
          color="14,165,233"
          outerAlpha={0.1}
          innerScale={0.3}
          outerScale={2}
          style={{
            mixBlendMode: "difference",
          }}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
          ]}
        />
        {children}
      </body>
    </html>
  );
}

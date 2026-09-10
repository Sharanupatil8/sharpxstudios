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
    | Organization
    |--------------------------------------------------------------------------
    */

    {
      "@type": "Organization",

      "@id": `${siteUrl}/#organization`,

      name: "SharpXstudios",

      url: siteUrl,

      logo: {
        "@type": "ImageObject",

        "@id": `${siteUrl}/#logo`,

        url: `${siteUrl}/logo.png`,

        contentUrl: `${siteUrl}/logo.png`,
      },

      image: {
        "@id": `${siteUrl}/#logo`,
      },

      description:
        "SharpXstudios is a Bangalore-based digital agency specializing in web development, AI automation, digital marketing, SEO, UI/UX design and modern digital solutions for businesses.",

      founder: {
        "@type": "Person",
        name: "Sharan P",
      },

      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },

      /*
       * This is where you tell Google the areas you serve.
       * Do NOT claim RR Nagar as your physical address unless
       * you actually have an office there.
       */

      areaServed: [
        {
          "@type": "City",
          name: "Bangalore",
        },

        {
          "@type": "Place",
          name: "RR Nagar",
        },

        {
          "@type": "Place",
          name: "Rajarajeshwari Nagar",
        },

        {
          "@type": "Place",
          name: "West Bangalore",
        },
      ],

      sameAs: [
        "https://www.instagram.com/sharpxstudios",
        "https://www.linkedin.com/company/sharpxstudios",
      ],

      contactPoint: {
        "@type": "ContactPoint",

        telephone: "+91-8050923077",

        contactType: "customer service",

        areaServed: "IN",

        availableLanguage: ["English"],
      },
    },

    /*
    |--------------------------------------------------------------------------
    | Website
    |--------------------------------------------------------------------------
    */

    {
      "@type": "WebSite",

      "@id": `${siteUrl}/#website`,

      url: siteUrl,

      name: "SharpXstudios",

      description:
        "SharpXstudios is a web development and AI automation agency in Bangalore serving businesses in RR Nagar and across India.",

      publisher: {
        "@id": `${siteUrl}/#organization`,
      },

      inLanguage: "en-IN",
    },

    /*
    |--------------------------------------------------------------------------
    | Homepage
    |--------------------------------------------------------------------------
    */

    {
      "@type": "WebPage",

      "@id": `${siteUrl}/#webpage`,

      url: siteUrl,

      name: "Web Development & AI Automation Agency in RR Nagar Bangalore | SharpXstudios",

      headline: "Web Development & AI Automation Agency in RR Nagar Bangalore",

      description:
        "SharpXstudios is a web development and AI automation agency serving businesses in RR Nagar, Rajarajeshwari Nagar and across Bangalore. We build high-performance websites, AI automation systems and digital marketing solutions.",

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

    /*
    |--------------------------------------------------------------------------
    | Web Development Service
    |--------------------------------------------------------------------------
    */

    {
      "@type": "Service",

      "@id": `${siteUrl}/#web-development`,

      name: "Web Development Agency in RR Nagar Bangalore",

      serviceType: "Web Development",

      description:
        "Professional web development services for businesses in RR Nagar and Bangalore, including custom websites, business websites, ecommerce websites, responsive web development, React and Next.js development, and website redesign.",

      provider: {
        "@id": `${siteUrl}/#organization`,
      },

      areaServed: [
        {
          "@type": "Place",
          name: "RR Nagar",
        },

        {
          "@type": "Place",
          name: "Rajarajeshwari Nagar",
        },

        {
          "@type": "City",
          name: "Bangalore",
        },
      ],
    },

    /*
    |--------------------------------------------------------------------------
    | AI Automation Service
    |--------------------------------------------------------------------------
    */

    {
      "@type": "Service",

      "@id": `${siteUrl}/#ai-automation`,

      name: "AI Automation Agency in RR Nagar Bangalore",

      serviceType: "AI Automation",

      description:
        "AI automation services for businesses in RR Nagar and Bangalore, including AI agents, workflow automation, business process automation, AI-powered customer support and intelligent business solutions.",

      provider: {
        "@id": `${siteUrl}/#organization`,
      },

      areaServed: [
        {
          "@type": "Place",
          name: "RR Nagar",
        },

        {
          "@type": "Place",
          name: "Rajarajeshwari Nagar",
        },

        {
          "@type": "City",
          name: "Bangalore",
        },
      ],
    },

    /*
    |--------------------------------------------------------------------------
    | Digital Marketing Service
    |--------------------------------------------------------------------------
    */

    {
      "@type": "Service",

      "@id": `${siteUrl}/#digital-marketing`,

      name: "Digital Marketing Agency in RR Nagar Bangalore",

      serviceType: "Digital Marketing",

      description:
        "Digital marketing services for businesses in RR Nagar and Bangalore, including SEO, social media marketing, content marketing, search marketing and growth strategies.",

      provider: {
        "@id": `${siteUrl}/#organization`,
      },

      areaServed: [
        {
          "@type": "Place",
          name: "RR Nagar",
        },

        {
          "@type": "City",
          name: "Bangalore",
        },
      ],
    },

    /*
    |--------------------------------------------------------------------------
    | SEO Service
    |--------------------------------------------------------------------------
    */

    {
      "@type": "Service",

      "@id": `${siteUrl}/#seo`,

      name: "SEO Agency in RR Nagar Bangalore",

      serviceType: "Search Engine Optimization",

      description:
        "SEO services for businesses in RR Nagar and Bangalore focused on improving organic visibility, search rankings, qualified traffic and leads.",

      provider: {
        "@id": `${siteUrl}/#organization`,
      },

      areaServed: [
        {
          "@type": "Place",
          name: "RR Nagar",
        },

        {
          "@type": "City",
          name: "Bangalore",
        },
      ],
    },

    /*
    |--------------------------------------------------------------------------
    | UI UX Design
    |--------------------------------------------------------------------------
    */

    {
      "@type": "Service",

      "@id": `${siteUrl}/#ui-ux`,

      name: "UI UX Design Agency in RR Nagar Bangalore",

      serviceType: "UI/UX Design",

      description:
        "Modern UI and UX design services for websites, web applications and digital products serving businesses in RR Nagar and Bangalore.",

      provider: {
        "@id": `${siteUrl}/#organization`,
      },

      areaServed: [
        {
          "@type": "Place",
          name: "RR Nagar",
        },

        {
          "@type": "City",
          name: "Bangalore",
        },
      ],
    },

    /*
    |--------------------------------------------------------------------------
    | AEO / GEO
    |--------------------------------------------------------------------------
    */

    {
      "@type": "Service",

      "@id": `${siteUrl}/#aeo-geo`,

      name: "AEO and GEO Services",

      serviceType:
        "Answer Engine Optimization and Generative Engine Optimization",

      description:
        "AEO and GEO strategies designed to improve brand visibility across search engines, AI-powered search and generative answer engines.",

      provider: {
        "@id": `${siteUrl}/#organization`,
      },

      areaServed: {
        "@type": "City",
        name: "Bangalore",
      },
    },
  ],
};

/*
|--------------------------------------------------------------------------
| Metadata
|--------------------------------------------------------------------------
*/

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

    "website development company in RR Nagar",

    "website design agency in RR Nagar",

    "web designer in RR Nagar",

    "custom website development RR Nagar",

    "ecommerce website development RR Nagar",

    "Next.js development RR Nagar",

    "React development RR Nagar",

    "AI agency in RR Nagar",

    "AI agency in RR Nagar Bangalore",

    "AI automation agency in RR Nagar",

    "AI automation agency in Bangalore",

    "AI automation company Bangalore",

    "AI agents for business Bangalore",

    "digital marketing agency in RR Nagar",

    "digital marketing agency in Bangalore",

    "SEO agency in RR Nagar",

    "SEO company in Bangalore",

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

        alt: "SharpXstudios - Web Development & AI Automation Agency in RR Nagar Bangalore",
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

/*
|--------------------------------------------------------------------------
| Root Layout
|--------------------------------------------------------------------------
*/

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

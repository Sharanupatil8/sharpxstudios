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
    | Note: "founder" removed intentionally to keep the owner's personal name
    | out of page source / Rich Results — flagged as a privacy concern earlier.
    | Re-add only if you're fine with your name being publicly discoverable.
    */
    {
      "@type": ["Organization", "LocalBusiness"],
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
      // Description now matches what the homepage actually says (small/local
      // businesses, not "modern enterprises") to avoid schema/content mismatch.
      description:
        "SharpXstudios is an in-house web development and AI automation studio based in Bangalore, building websites, AI automation systems, and AEO/GEO-ready growth for small and local businesses.",
      address: {
        "@type": "PostalAddress",
        // TODO: replace with a real, specific address (e.g. a coworking/virtual
        // office in RR Nagar) if you want stronger local-pack ranking. Leaving
        // this at city-level only is the safer default for now given the
        // privacy concern you raised.
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
        { "@type": "City", name: "Bangalore" },
        { "@type": "AdministrativeArea", name: "Rajarajeshwari Nagar (RR Nagar)" },
        { "@type": "Place", name: "West Bangalore" },
        { "@type": "Country", name: "India" },
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
      // Reflects your actual published pricing tiers (Starter/Business/Custom).
      priceRange: "₹19,999 – ₹39,999+",
      // Built from your real, visible testimonials (5 reviews, avg ~4.84).
      // Update the values here whenever you add/remove real client reviews —
      // never leave this out of sync with what's shown on the page.
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "5",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Mithun" },
          reviewRating: { "@type": "Rating", ratingValue: "4.8", bestRating: "5" },
          reviewBody:
            "The team understood what we were trying to achieve and turned it into a website that feels professional, modern, and true to our brand. Communication was smooth throughout the project.",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Vivek" },
          reviewRating: { "@type": "Rating", ratingValue: "5.0", bestRating: "5" },
          reviewBody:
            "We wanted a stronger online presence without losing the personality of our restaurant. The team made the process simple and delivered a website that represents our brand beautifully.",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Sakshi Singh" },
          reviewRating: { "@type": "Rating", ratingValue: "4.9", bestRating: "5" },
          reviewBody:
            "From the initial discussions to the final launch, the team was responsive and thoughtful. They took the time to understand our requirements and delivered a polished digital experience.",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Neha Patel" },
          reviewRating: { "@type": "Rating", ratingValue: "4.8", bestRating: "5" },
          reviewBody:
            "What stood out was their ability to combine design with usability. The final product looks great, but more importantly, it is easy for our customers to navigate and interact with.",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Ravi Nair" },
          reviewRating: { "@type": "Rating", ratingValue: "4.7", bestRating: "5" },
          reviewBody:
            "The team brought a clear process to the project and was open to feedback at every stage. The result was a clean, professional website that gives our business a much stronger digital presence.",
        },
      ],
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
    | headline/description rewritten to match the actual homepage copy
    | ("We help businesses grow in the digital world" — small/local business
    | audience) instead of the previous "modern enterprises" framing, which
    | didn't match anything visible on the page.
    */
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Web Development & AI Automation Agency in RR Nagar Bangalore | SharpXstudios",
      headline: "We help businesses grow in the digital world.",
      description:
        "SharpXstudios builds high-performance websites, AI automation systems, and AEO/GEO-ready growth strategies for small and local businesses in Bangalore.",
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
  // Author changed from a personal name to the business name to avoid
  // publicly exposing the owner's identity in page metadata.
  authors: [
    {
      name: "SharpXstudios",
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

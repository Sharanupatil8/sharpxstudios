"use client";
import React from "react";
import { motion } from "framer-motion";
import AnimatedHeading from "./SecondaryHeading";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "₹19,999",
    period: "one-time",
    description:
      "A focused business website that gets you found and looking credible.",
    features: [
      "Up to 6 pages, custom design",
      "Built on Next.js, mobile-first",
      "Basic on-page SEO",
      "2 week turnaround",
    ],
    featured: false,
  },
  {
    name: "Business",
    price: "₹39,999",
    period: "one-time",
    description:
      "SEO, AEO-ready structure, and room to grow with your business.",
    features: [
      "Up to 12 pages, blog & CMS",
      "Schema markup + AEO/GEO structure",
      "Full on-page & technical SEO",
      "30-day post-launch support",
    ],
    featured: true,
  },
  {
    name: "Custom",
    price: "Let's talk",
    period: "",
    description:
      "E-commerce, web apps, or AI automation scoped to what you need.",
    features: [
      "E-commerce & booking platforms",
      "AI agents & workflow automation",
      "Ongoing growth retainers",
    ],
    featured: false,
  },
];

// Stagger + rise-in, matching the Portfolio section's cardVariants pattern
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.12,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const checkVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + index * 0.06, duration: 0.3 },
  }),
};

const Pricing = () => {
  return (
    <section id="pricing" className="bg-white">
      <motion.div
        id="pricing"
        className="container max-w-8xl mx-auto px-4 md:px-12 lg:px-16 my-8 md:my-12 py-8 md:py-16 lg:my-24"
      >
        <div className="text-center">
          <AnimatedHeading words={["Fixed", "price.", "No", "surprises."]} />
        </div>

        <motion.p
          whileInView={{ y: [100, 0], opacity: [0, 50, 100] }}
          transition={{ duration: 0.3 }}
          className="text-gray-700 text-center dark:text-gray-400 max-w-xl mx-auto"
        >
          Agreed in writing before work begins. Source code is yours on
          delivery.
        </motion.p>

        <div className="grid grid-cols-1 gap-y-8 pt-8 md:pt-12 md:gap-x-8 md:grid-cols-3 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              custom={i}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <div
                className={`relative rounded-xl h-full flex flex-col p-6 md:p-8 border overflow-hidden transition-colors duration-200 ${
                  plan.featured
                    ? "border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-200/60"
                    : "border-indigo-200 bg-gray-50 hover:border-indigo-400"
                }`}
              >
                {plan.featured && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    viewport={{ once: false }}
                    className="absolute -top-1\2 left-6 bg-indigo-700 text-white text-xs font-medium px-3 py-1 rounded-full"
                  >
                    Most chosen
                  </motion.span>
                )}

                <h3 className="text-lg font-medium text-gray-900">
                  {plan.name}
                </h3>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                  viewport={{ once: false }}
                  className="flex items-baseline gap-2 mt-3 mb-2"
                >
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  )}
                </motion.div>

                <p className="text-gray-700 dark:text-gray-400 text-sm mb-6">
                  {plan.description}
                </p>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feature, fi) => (
                    <motion.li
                      key={feature}
                      custom={fi}
                      variants={checkVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.2 }}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <Link
                  href="wa.me/+918050923077"
                  className={`text-center py-2.5 px-4 rounded-md font-medium duration-150 ease-linear mt-auto ${
                    plan.featured
                      ? "bg-indigo-700 text-white hover:bg-indigo-600"
                      : "bg-white text-indigo-700 border border-indigo-700 hover:bg-indigo-50"
                  }`}
                >
                  {plan.featured ? "Get started" : "Get a quote"}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Pricing;

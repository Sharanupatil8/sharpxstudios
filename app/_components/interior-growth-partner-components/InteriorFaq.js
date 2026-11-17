"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiArrowUpRight,
  HiOutlineChatBubbleLeftRight,
  HiPlus,
} from "react-icons/hi2";

/* FAQ on the white background (Pricing above is grey, Contact below is grey).
   - every question is in the page HTML; the tabs only hide/show them
   - one answer open at a time, with a smooth CSS height transition
   - the intro stays in view on desktop, with a WhatsApp card
   - FAQPage structured data (all questions) for Google and AI search
   - gsap: header and rows animate in, rows re-animate when you switch tabs,
     and everything replays when you scroll back ("reduce motion": final state)
   - background: notebook rules, margin line and a ruler (same as the hero)

   Prices and terms here must match InteriorPricing.jsx. */

const WA = "918050923077";
const wa = (t) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

const categories = [
  "All",
  "Getting started",
  "Pricing",
  "Website",
  "SEO & AI search",
  "Ads & automation",
  "Working together",
];

const faqs = [
  /* ---------- Getting started ---------- */
  {
    c: "Getting started",
    q: "Do you only build websites?",
    a: "No. A website is the base, but we also run SEO and Google Maps, Meta and Google ads, content and brand design, and AI lead automation on WhatsApp. You can start with a website and add the rest when you're ready.",
  },
  {
    c: "Getting started",
    q: "What does the free audit include?",
    a: "A short review of your website, Google Maps listing, Instagram and ads, and what competitors in your area are doing, plus the top fixes in order of impact and a 30-day plan. It's yours to keep, whether or not we work together.",
  },
  {
    c: "Getting started",
    q: "Which plan is right for my studio?",
    a: "A solo designer or new studio that needs a credible portfolio online should start with Website. An established studio that wants enquiries from Google should choose Website + SEO. If you'd like us to run your marketing every month, that's Growth Partner. The free audit tells you which one fits.",
  },
  {
    c: "Getting started",
    q: "I already have a website. Should I redesign?",
    a: "Not always. The audit tells you whether a redesign, or a few targeted fixes to speed, structure and enquiry flow, will move enquiries most.",
  },
  {
    c: "Getting started",
    q: "Do you only work with interior designers and architects?",
    a: "Interior and architecture is our core focus: our portfolio includes G Cube Studios and G Cube Infra. Knowing how homeowners and developers shortlist a studio is what makes a site convert, not just look good.",
  },
  {
    c: "Getting started",
    q: "Can studios outside Bangalore work with you?",
    a: "Yes. Our team is based in RR Nagar, Bangalore, and the work is done online over WhatsApp, calls and shared previews, so you don't need to be in the city.",
  },

  /* ---------- Pricing ---------- */
  {
    c: "Pricing",
    q: "How much does a website for an interior designer cost?",
    a: "Our Website plan is ₹49,999 (up to 6 pages) and Website + SEO is ₹89,999 (up to 12 pages with area and service SEO pages), both one-time and exclusive of GST. The price is fixed and agreed in writing before work starts.",
  },
  {
    c: "Pricing",
    q: "What's included in the Growth Partner monthly fee?",
    a: "Local SEO with Google profile and review management, one ad channel (Meta or Google) managed for you, 12 posts and 4 reels a month, AI WhatsApp follow-up (setup included), and a monthly report with a strategy call. It starts at ₹35,000 a month, with a 3-month minimum so the work has time to show results.",
  },
  {
    c: "Pricing",
    q: "Is GST included in the prices?",
    a: "No. All prices on this page are exclusive of GST.",
  },
  {
    c: "Pricing",
    q: "Is ad spend included in the price?",
    a: "No. Ad budgets are paid directly to Meta and Google so they stay in your control. Our fee covers the work, and Growth Partner scope is agreed in writing.",
  },
  {
    c: "Pricing",
    q: "Are there any hidden costs?",
    a: "No. The price is fixed and agreed in writing before work starts. The only costs outside it are ones you pay at cost, such as ad budgets and WhatsApp message charges, plus optional extras you choose, like Care & hosting from ₹5,000 a month.",
  },
  {
    c: "Pricing",
    q: "Can I buy just one service instead of a plan?",
    a: "Yes. Google Business Profile setup, local SEO, ads management, content and reels, AI WhatsApp automation and Care & hosting can each be bought on their own. Prices are listed in the services menu above.",
  },

  /* ---------- Website ---------- */
  {
    c: "Website",
    q: "How long does a website take?",
    a: "About 2 weeks for the Website plan and 3–4 weeks for Website + SEO, depending on how quickly you share project photos and content.",
  },
  {
    c: "Website",
    q: "Do I own the website and code?",
    a: "Yes. Pricing is fixed and agreed in writing before work starts, and source code is yours on delivery.",
  },
  {
    c: "Website",
    q: "What do you need from me to get started?",
    a: "Your best project photos, a short bio, details of a few projects (location, size, scope), any client testimonials you have, and your logo. We guide you through it, and the audit shows what is missing.",
  },
  {
    c: "Website",
    q: "Will the site be fast and work on mobile?",
    a: "Yes. Most clients look at your work on a phone, so every site is built mobile-first with compressed images and clean code. We aim for Google PageSpeed scores in the 90s and check Core Web Vitals before launch.",
  },
  {
    c: "Website",
    q: "Is the design custom, or a template?",
    a: "Custom. The layout is built around your projects and your style rather than a ready-made theme, so it doesn't look like every other studio's site.",
  },
  {
    c: "Website",
    q: "Can I add new projects myself later?",
    a: "On Website + SEO, yes: it includes a case-study CMS, so you can add projects without a developer. On the Website plan, we can make updates for you under Care & hosting.",
  },

  /* ---------- SEO & AI search ---------- */
  {
    c: "SEO & AI search",
    q: "Can you help with SEO and getting found on AI search?",
    a: "Yes. We build local service and area pages and structure content (schema, AEO/GEO) so you can be cited by Google, ChatGPT and Perplexity.",
  },
  {
    c: "SEO & AI search",
    q: "What are AEO and GEO?",
    a: "Answer engine optimisation and generative engine optimisation: making your content clear and well structured so tools like Google AI Overviews, ChatGPT, Claude and Perplexity can understand your studio and quote you when someone asks for a designer.",
  },
  {
    c: "SEO & AI search",
    q: "What is a Google Business Profile, and do I need one?",
    a: "It's your free listing on Google Maps and local search. For searches like “interior designers near me”, it is often the first thing people see, so we set it up, optimise it and build a steady flow of reviews.",
  },
  {
    c: "SEO & AI search",
    q: "How long does SEO take to show results?",
    a: "Local SEO often starts to move within two to three months, and competitive areas take longer. We track rankings, calls and enquiries every month so you can see what is working.",
  },
  {
    c: "SEO & AI search",
    q: "Do you guarantee a number one ranking?",
    a: "No, and be careful with anyone who does. Rankings depend on Google and on your competitors. We promise the work, clear reporting and steady improvement, not a position.",
  },

  /* ---------- Ads & automation ---------- */
  {
    c: "Ads & automation",
    q: "Should I run Google ads or Instagram ads?",
    a: "Google ads reach people searching for a designer right now. Instagram and Meta ads reach people who are planning a project but haven't started looking. We usually start with one channel, chosen after the audit, and add the other once it works.",
  },
  {
    c: "Ads & automation",
    q: "What does AI WhatsApp automation actually do?",
    a: "It replies to every enquiry instantly, asks about the property type, size, budget and timeline, shares relevant projects, and offers a time for a site visit. You see every conversation and can take over any time.",
  },
  {
    c: "Ads & automation",
    q: "Will the AI talk to my clients instead of me?",
    a: "It handles the first reply and the basic questions, so no enquiry waits. You decide what it asks and says, and the design conversations stay with you.",
  },
  {
    c: "Ads & automation",
    q: "Do you make reels and posts?",
    a: "Yes. Our content service turns your real project photos and videos into 12 posts and 4 reels a month, so your work reaches people who don't follow you yet.",
  },

  /* ---------- Working together ---------- */
  {
    c: "Working together",
    q: "Do you guarantee enquiries or results?",
    a: "No. Nobody can honestly promise a number of leads. We build the system that gets you found and answers every enquiry, then measure it and show you the numbers every month.",
  },
  {
    c: "Working together",
    q: "Is there a contract or minimum commitment?",
    a: "The website is a fixed-price project with scope and price agreed in writing first. Growth Partner has a 3-month minimum, because SEO and ads need time to show results.",
  },
  {
    c: "Working together",
    q: "What happens after the website goes live?",
    a: "Website + SEO includes 30 days of post-launch support. After that you can add Care & hosting from ₹5,000 a month for hosting, backups, speed checks and small edits, or move on to a Growth Partner plan.",
  },
  {
    c: "Working together",
    q: "How will we communicate and how will I see progress?",
    a: "Day to day over WhatsApp. Growth Partner clients also get a monthly report covering rankings, PageSpeed, enquiries and cost per lead, followed by a strategy call.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const Eyebrow = ({ children }) => (
  <div className="mb-6 flex items-center gap-3">
    <span className="h-px w-7 shrink-0 bg-indigo-600" />
    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-400">
      {children}
    </p>
  </div>
);

/* ---------- Background: notebook rules + ruler ticks ----------
   Colours come from CSS variables (set on the wrapper in the JSX), so the
   same lines look right in both light and dark mode. */

const fadeDown =
  "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)";
const fadeSides =
  "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)";

// Horizontal ruled lines, like a notebook page (one line every 48px)
const notebookLines = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, transparent 0, transparent 47px, var(--rule) 47px, var(--rule) 48px)",
  maskImage: fadeDown,
  WebkitMaskImage: fadeDown,
};

// Ruler along the top edge: a small tick every 8px, a tall tick every 80px
const rulerTicks = {
  backgroundImage: [
    "repeating-linear-gradient(to right, var(--tick-major) 0, var(--tick-major) 1px, transparent 1px, transparent 80px)",
    "repeating-linear-gradient(to right, var(--tick-minor) 0, var(--tick-minor) 1px, transparent 1px, transparent 8px)",
  ].join(","),
  backgroundSize: "100% 16px, 100% 8px",
  backgroundRepeat: "no-repeat",
  maskImage: fadeSides,
  WebkitMaskImage: fadeSides,
};

export default function InteriorFaq() {
  const sectionRef = useRef(null);
  const playRef = useRef(null); // set when motion is allowed: re-animates the visible rows
  const [cat, setCat] = useState("Getting started");
  const [open, setOpen] = useState(faqs[0].q);

  /* switching tabs re-plays the rows that are now showing */
  useEffect(() => {
    if (playRef.current) playRef.current();
  }, [cat]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = sectionRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);

      const head = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });
      head
        .fromTo(
          q(".f-eyebrow"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 },
        )
        .fromTo(
          q(".f-title"),
          { y: 36, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9 },
          "-=0.3",
        )
        .fromTo(
          q(".f-sub"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          "-=0.5",
        )
        .fromTo(
          q(".f-help"),
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          "-=0.4",
        );
      ScrollTrigger.create({
        trigger: q(".f-intro")[0],
        start: "top 85%",
        onEnter: () => head.restart(),
        onEnterBack: () => head.restart(),
        onLeave: () => head.pause(0),
        onLeaveBack: () => head.pause(0),
      });

      // rows are looked up each time, so they work after the tab changes
      const visibleRows = () => q(".f-row:not([hidden])");
      const play = () =>
        gsap.fromTo(
          visibleRows(),
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.035,
            ease: "power3.out",
            overwrite: true,
          },
        );
      const hide = () => gsap.set(visibleRows(), { y: 20, autoAlpha: 0 });
      playRef.current = play;

      ScrollTrigger.create({
        trigger: q(".f-tabs")[0],
        start: "top 85%",
        onEnter: play,
        onEnterBack: play,
        onLeave: hide,
        onLeaveBack: hide,
      });

      return () => {
        playRef.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  return (
    /* relative + isolate keep the background behind the content.
       No overflow-hidden here: it would break the sticky intro on desktop. */
    <section
      ref={sectionRef}
      id="faq"
      className="relative isolate py-20 md:py-28"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Background: notebook rules, margin line and ruler (behind everything) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [--rule:rgba(79,70,229,0.10)] [--tick-major:rgba(79,70,229,0.45)] [--tick-minor:rgba(79,70,229,0.25)] dark:[--rule:rgba(165,180,252,0.10)] dark:[--tick-major:rgba(199,210,254,0.45)] dark:[--tick-minor:rgba(199,210,254,0.25)]"
      >
        {/* Notebook rules */}
        <div className="absolute inset-0" style={notebookLines} />
        {/* Margin line, just left of the content column */}
        <div
          className="absolute inset-y-0 w-px bg-gradient-to-b from-indigo-500/30 via-indigo-500/15 to-transparent dark:from-violet-300/30 dark:via-violet-300/15"
          style={{ left: "max(0.25rem, calc(50% - 40rem - 1rem))" }}
        />
        {/* Ruler ticks along the top edge */}
        <div className="absolute inset-x-0 top-0 h-4" style={rulerTicks} />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-[5fr_7fr] lg:gap-16">
        {/* Intro: stays in view while you read the answers (desktop) */}
        <div className="f-intro lg:sticky lg:top-28 lg:self-start">
          <div className="f-eyebrow motion-safe:invisible">
            <Eyebrow>FAQ</Eyebrow>
          </div>
          <h2 className="f-title text-5xl font-black leading-[48px] tracking-tighter text-gray-900 motion-safe:invisible dark:text-white md:text-6xl md:leading-[68px]">
            Questions,{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text italic text-transparent dark:from-indigo-300 dark:to-indigo-500">
              answered.
            </span>
          </h2>
          <p className="f-sub mt-6 max-w-md text-lg text-gray-700 motion-safe:invisible dark:text-gray-400">
            Pricing, timelines, SEO, AI and what you own: everything studios ask
            us before getting started.
          </p>

          <div className="f-help mt-8 max-w-md rounded-3xl bg-gradient-to-br from-[#09091F] via-[#17134F] to-[#30218A] p-6 text-white motion-safe:invisible md:p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-2xl text-indigo-200">
              <HiOutlineChatBubbleLeftRight />
            </span>
            <p className="mt-4 text-xl font-black tracking-tight">
              Can&apos;t find your question?
            </p>
            <p className="mt-1 text-gray-300">
              Ask us on WhatsApp. We usually reply within a few hours.
            </p>
            <a
              href={wa(
                "Hi! I have a question about websites and marketing for my studio.",
              )}
              className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-md border border-indigo-500 bg-indigo-600 px-4 py-3 text-lg font-bold text-white transition hover:bg-indigo-700"
            >
              Ask on WhatsApp <HiArrowUpRight />
            </a>
          </div>
        </div>

        {/* min-w-0 keeps the scrolling tab row from stretching this column */}
        <div className="min-w-0">
          {/* Category tabs (scroll sideways on small screens) */}
          <div
            role="group"
            aria-label="Filter questions"
            className="f-tabs -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  cat === c
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-gray-200 text-gray-700 hover:border-indigo-500 hover:text-indigo-600 dark:border-white/15 dark:text-gray-300 dark:hover:border-indigo-400 dark:hover:text-indigo-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <ul className="grid gap-3">
            {faqs.map(({ c, q, a }, i) => {
              const isOpen = open === q;
              const show = cat === "All" || cat === c;
              return (
                <li
                  key={q}
                  hidden={!show}
                  className={`f-row rounded-2xl border bg-gray-50 transition-colors duration-300 motion-safe:invisible dark:bg-white/5 ${
                    isOpen
                      ? "border-indigo-500/50 shadow-lg shadow-indigo-500/10"
                      : "border-gray-200 hover:border-indigo-500/30 dark:border-white/10"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : q)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-lg font-bold text-gray-900 dark:text-white md:px-7"
                    >
                      {q}
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 bg-indigo-600 text-white"
                            : "bg-indigo-600/10 text-indigo-600 dark:text-indigo-300"
                        }`}
                      >
                        <HiPlus />
                      </span>
                    </button>
                  </h3>

                  {/* height animates from 0fr to 1fr, no js needed */}
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 text-gray-700 dark:text-gray-400 md:px-7">
                        {a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

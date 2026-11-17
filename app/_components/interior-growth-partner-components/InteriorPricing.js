"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowUpRight, HiCheck } from "react-icons/hi2";

/* Pricing: dark section, same family as the client journey.
   - Edit PLANS below; the cards are built from it. Prices are in INR, excluding 18% GST.
   - GSAP owns the hidden "before" state, so if JS fails the content is simply visible.
   - Each group replays every time it scrolls into view, from above or below.
   - With "reduce motion" the animation block never runs and the final state shows. */

/* ---------- Numbers and copy you can edit ---------- */

const inr = (n) => Number(n).toLocaleString("en-IN");

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tag: "Get online and found on Google",
    setup: 25000,
    monthly: null,
    term: "One-time payment",
    cta: "Start with Starter",
    features: [
      "6-page website",
      "Google Business Profile",
      "Basic SEO, fast on mobile",
      "WhatsApp button and enquiry form",
    ],
  },
  {
    id: "launch",
    name: "Launch",
    tag: "Look established, reply instantly",
    setup: 50000,
    monthly: null,
    term: "One-time payment",
    cta: "Choose Launch",
    features: [
      "Everything in Starter, plus:",
      "10–12 pages with project galleries",
      "Pages for your areas and services",
      "WhatsApp auto-replies set up",
      "Google review system",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tag: "Get a steady flow of enquiries",
    setup: 50000,
    monthly: 20000,
    note: "Ad spend and WhatsApp fees are paid directly to Meta.",
    term: "3-month minimum, then cancel any time",
    cta: "Choose Growth",
    featured: true,
    features: [
      "Everything in Launch, plus every month:",
      "Meta ads managed for you",
      "SEO updates",
      "WhatsApp replies improved",
      "A simple monthly report",
    ],
  },
];

const FAQ = [
  {
    q: "Why is Growth monthly?",
    a: "A website alone doesn't bring leads. Ads and SEO need work every month.",
  },
  {
    q: "What do I pay separately?",
    a: "Ad spend and WhatsApp fees go straight to Meta. Ad budgets usually start around ₹20,000 a month.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. Your website carries over, so nothing is rebuilt.",
  },
];

/* ---------- Background: notebook rules + ruler ticks (same as the journey) ---------- */

const fadeDown =
  "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)";
const fadeSides =
  "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)";

const notebookLines = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, transparent 0, transparent 47px, rgba(165,180,252,0.11) 47px, rgba(165,180,252,0.11) 48px)",
  maskImage: fadeDown,
  WebkitMaskImage: fadeDown,
};

const rulerTicks = {
  backgroundImage: [
    "repeating-linear-gradient(to right, rgba(199,210,254,0.5) 0, rgba(199,210,254,0.5) 1px, transparent 1px, transparent 80px)",
    "repeating-linear-gradient(to right, rgba(199,210,254,0.28) 0, rgba(199,210,254,0.28) 1px, transparent 1px, transparent 8px)",
  ].join(","),
  backgroundSize: "100% 16px, 100% 8px",
  backgroundRepeat: "no-repeat",
  maskImage: fadeSides,
  WebkitMaskImage: fadeSides,
};

/* ---------- Small pieces ---------- */

const Eyebrow = ({ children }) => (
  <div className="mb-6 flex items-center justify-center gap-3 md:justify-start">
    <span className="hidden h-px w-7 shrink-0 bg-indigo-300 md:inline-block" />
    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-300">
      {children}
    </p>
  </div>
);

const Tick = () => (
  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-400/20 text-[10px] text-indigo-200">
    <HiCheck />
  </span>
);

const AuditButton = ({ children }) => (
  <a
    href="#contact"
    className="block whitespace-nowrap rounded-md border border-indigo-500 bg-indigo-600 px-4 py-3 text-lg font-bold text-white transition hover:bg-indigo-700"
  >
    {children} <HiArrowUpRight className="inline-block text-lg" />
  </a>
);

/* ---------- Section ---------- */

export default function InteriorPricing() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = sectionRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);
      const counts = q("[data-count]");
      const setCount = (el, v) => {
        el.textContent = inr(Math.round(v));
      };
      counts.forEach((el) => setCount(el, 0));

      const timeline = () =>
        gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      // Replays every time the group enters view (scrolling down or back up),
      // and resets to the hidden state when it leaves, ready for the next entry.
      const bind = (trigger, tl, onReset) => {
        if (!trigger) return;
        const play = () => tl.restart();
        const reset = () => {
          tl.pause(0);
          if (onReset) onReset();
        };
        const st = ScrollTrigger.create({
          trigger,
          start: "top 85%",
          onEnter: play,
          onEnterBack: play,
          onLeave: reset,
          onLeaveBack: reset,
        });
        if (st.isActive) play();
      };

      /* header */
      const head = timeline();
      head
        .fromTo(
          q(".pr-eyebrow"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 },
        )
        .fromTo(
          q(".pr-title"),
          { y: 36, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9 },
          "-=0.3",
        )
        .fromTo(
          q(".pr-sub"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          "-=0.5",
        );
      bind(q(".pr-head")[0], head);

      /* plan cards, with prices counting up */
      const plans = timeline();
      plans.fromTo(
        q(".pr-card"),
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.14 },
      );
      counts.forEach((el) => {
        const obj = { v: 0 };
        plans.to(
          obj,
          {
            v: Number(el.dataset.to),
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => setCount(el, obj.v),
          },
          0.5,
        );
      });
      bind(q(".pr-plans")[0], plans, () =>
        counts.forEach((el) => setCount(el, 0)),
      );

      /* footnote, FAQ and closing */
      [".pr-note", ".pr-faqs", ".pr-end"].forEach((sel) => {
        const el = q(sel)[0];
        if (!el) return;
        const tl = timeline();
        const children = sel === ".pr-faqs" ? q(".pr-faq") : [el];
        tl.fromTo(
          children,
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1 },
        );
        bind(el, tl);
      });

      // Layout can shift after fonts and images load, so re-measure the triggers.
      ScrollTrigger.refresh();

      return () => {
        counts.forEach((el) => {
          el.textContent = el.dataset.final;
        });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative isolate w-full overflow-hidden bg-gradient-to-br from-[#09091F] via-[#17134F] to-[#30218A] px-2 py-20 text-white md:px-4 md:py-28"
    >
      {/* Atmosphere: soft glows, notebook rules, margin line and a ruler */}
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[450px] w-[450px] rounded-full bg-violet-500/20 blur-[140px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={notebookLines}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -z-10 w-px bg-gradient-to-b from-violet-300/30 via-violet-300/15 to-transparent"
        style={{ left: "max(0.25rem, calc(50% - 40rem - 1rem))" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-4"
        style={rulerTicks}
      />

      <div className="mx-auto max-w-7xl md:px-6 lg:px-0">
        {/* Header */}
        <div className="pr-head">
          <div className="pr-eyebrow">
            <Eyebrow>Pricing</Eyebrow>
          </div>
          <h2 className="pr-title max-w-5xl text-center text-5xl font-black leading-[48px] tracking-[-5px] text-white md:text-start md:text-6xl md:leading-[68px] xl:text-7xl xl:leading-[80px]">
            Simple pricing for{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-indigo-500 bg-clip-text italic text-transparent">
              interior studios &amp; architects.
            </span>
          </h2>
          <p className="pr-sub mb-14 mt-6 max-w-2xl text-center text-lg text-gray-400 md:mb-16 md:text-start">
            Start with a website. Add monthly marketing when you want leads.
          </p>
        </div>

        {/* Plans */}
        <div className="pr-plans grid gap-5 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.id} className="pr-card">
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-6 transition-colors duration-300 md:p-7 ${
                  p.featured
                    ? "border-indigo-400/60 bg-gradient-to-b from-indigo-500/20 to-indigo-500/[0.06] shadow-[0_0_80px_rgba(99,102,241,0.25)]"
                    : "border-white/10 bg-white/[0.04] hover:border-indigo-300/30 hover:bg-white/[0.07]"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 px-3 py-1 text-xs font-bold text-[#09091F]">
                    Recommended
                  </span>
                )}

                <h3 className="text-2xl font-black tracking-[-1px]">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-gray-400">{p.tag}</p>

                {/* Price */}
                <div className="mt-6">
                  <p className="text-xs font-semibold text-gray-400">
                    {p.monthly ? "Setup" : "Price"}
                  </p>
                  <p className="text-4xl font-black tracking-[-2px] md:text-5xl">
                    ₹
                    <span
                      data-count
                      data-to={p.setup}
                      data-final={inr(p.setup)}
                    >
                      {inr(p.setup)}
                    </span>
                  </p>
                  {p.monthly && (
                    <p className="mt-2 text-lg font-bold text-indigo-200">
                      + ₹
                      <span
                        data-count
                        data-to={p.monthly}
                        data-final={inr(p.monthly)}
                      >
                        {inr(p.monthly)}
                      </span>
                      <span className="text-sm font-medium text-gray-400">
                        {" "}
                        / month
                      </span>
                    </p>
                  )}
                </div>

                <a
                  href="#contact"
                  className={`mt-6 block rounded-md border px-4 py-3 text-center text-base font-bold transition ${
                    p.featured
                      ? "border-indigo-500 bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  {p.cta} <HiArrowUpRight className="inline-block text-lg" />
                </a>
                <p className="mt-3 text-center text-xs text-gray-400">
                  {p.term}
                </p>

                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-gray-300">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={`flex gap-2.5 ${
                        f.endsWith(":") ? "font-semibold text-white" : ""
                      }`}
                    >
                      {!f.endsWith(":") && <Tick />}
                      {f}
                    </li>
                  ))}
                </ul>

                {p.note && (
                  <p className="mt-auto pt-6 text-xs leading-relaxed text-indigo-200/80">
                    {p.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="pr-note mt-5 text-center text-xs text-gray-500">
          Prices in INR, excluding 18% GST. You own your website and logins.
          Need something bigger?{" "}
          <a
            href="#contact"
            className="font-semibold text-indigo-300 transition hover:text-white"
          >
            Ask for a custom quote
          </a>
          .
        </p>

        {/* FAQ */}
        <div className="pr-faqs mt-14 grid gap-8 md:grid-cols-3">
          {FAQ.map((f) => (
            <div key={f.q} className="pr-faq text-start">
              <h3 className="text-lg font-black tracking-[-0.5px]">{f.q}</h3>
              <p className="mt-2 text-gray-400">{f.a}</p>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div className="pr-end mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <div className="text-center md:text-start">
            <p className="text-2xl font-black tracking-[-1px] md:text-3xl">
              Not sure which plan fits your studio?
            </p>
            <p className="mt-2 text-lg text-gray-400">
              Get a free growth audit. We&apos;ll suggest a plan and put the
              price in writing.
            </p>
          </div>
          <AuditButton>Get a Free Growth Audit</AuditButton>
        </div>
      </div>
    </section>
  );
}

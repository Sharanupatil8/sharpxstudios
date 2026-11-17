"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowUpRight, HiCheck } from "react-icons/hi2";

/* Process: a vertical timeline on the white background.
   - the line fills as you scroll, and each step number lights up when reached
   - every step has a small visual that plays when it scrolls in, and again
     when you come back to it
   With "reduce motion" nothing is hidden or animated: the final state shows. */

const Eyebrow = ({ children }) => (
  <div className="mb-6 flex items-center gap-3">
    <span className="h-px w-7 shrink-0 bg-indigo-600" />
    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-400">
      {children}
    </p>
  </div>
);

const format = (v, el) =>
  `${el.dataset.prefix || ""}${Number(v).toFixed(Number(el.dataset.dec || 0))}${el.dataset.suffix || ""}`;

/* ---------- Visuals (dark panel, same family as the services cards) ---------- */

/* 01 · Audit: a scorecard of what we find */
function AuditVisual() {
  const rows = [
    { l: "Website", n: 42, w: "w-[42%]", c: "bg-red-400" },
    { l: "Google profile", n: 58, w: "w-[58%]", c: "bg-amber-400" },
    { l: "Instagram", n: 35, w: "w-[35%]", c: "bg-red-400" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-4 text-left">
      <div className="p-item flex items-center justify-between motion-safe:invisible">
        <p className="text-[11px] font-semibold text-indigo-100">
          Growth audit
        </p>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold text-indigo-100">
          Today
        </span>
      </div>
      {rows.map((r) => (
        <div key={r.l} className="p-item motion-safe:invisible">
          <div className="mb-1 flex justify-between text-[10px] text-indigo-100/80">
            <span>{r.l}</span>
            <span className="font-semibold text-white">
              <span data-count data-to={r.n} data-final={r.n}>
                {r.n}
              </span>
              /100
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className={`p-bar h-full origin-left rounded-full ${r.c} ${r.w}`}
            />
          </div>
        </div>
      ))}
      <span className="p-item w-fit rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-400/30 motion-safe:invisible">
        Top 5 fixes ready
      </span>
    </div>
  );
}

/* 02 · Strategy: a sitemap */
function StrategyVisual() {
  const pages = ["Projects", "Services", "Areas", "Contact"];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-0 p-4">
      <span className="p-item rounded-md bg-indigo-500 px-4 py-1.5 text-[11px] font-bold text-white shadow-lg motion-safe:invisible">
        Home
      </span>
      <span className="p-item h-4 w-px bg-indigo-300/50 motion-safe:invisible" />
      <span className="p-item h-px w-[78%] bg-indigo-300/50 motion-safe:invisible" />
      <div className="grid w-full grid-cols-4 gap-2">
        {pages.map((p) => (
          <div
            key={p}
            className="p-item flex flex-col items-center motion-safe:invisible"
          >
            <span className="h-3 w-px bg-indigo-300/50" />
            <span className="w-full truncate rounded-md border border-white/15 bg-white/10 px-1 py-1.5 text-center text-[9.5px] font-semibold text-indigo-50">
              {p}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        {["Plan", "Budget", "Quote"].map((t) => (
          <span
            key={t}
            className="p-item rounded-full bg-white/10 px-2.5 py-0.5 text-[9px] font-semibold text-indigo-100 motion-safe:invisible"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* 03 · Build: a site coming together */
function BuildVisual() {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg bg-[#0d0c2e] shadow-xl ring-1 ring-white/10">
        <div className="flex items-center gap-1.5 bg-white/[0.07] px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 flex-1 truncate rounded bg-white/10 px-2 py-0.5 text-[10px] text-indigo-100/70">
            staging.yourstudio.com
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-2.5">
          <div className="p-item flex items-center justify-between motion-safe:invisible">
            <span className="h-1.5 w-12 rounded bg-white/40" />
            <span className="h-3 w-9 rounded-full bg-indigo-400" />
          </div>
          <div className="p-item flex-1 rounded-md bg-gradient-to-br from-[#ead9bf] via-[#c79f76] to-[#7d5c43] motion-safe:invisible" />
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className="p-item h-6 rounded bg-white/15 motion-safe:invisible"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 04 · Launch: a checklist that ticks itself */
function LaunchVisual() {
  const items = [
    "Website live",
    "Google profile verified",
    "Tracking switched on",
    "WhatsApp connected",
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-4 text-left">
      <div className="p-item mb-1 flex items-center gap-2 motion-safe:invisible">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:hidden" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <p className="text-[12px] font-bold text-white">Live</p>
        <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold text-indigo-100">
          yourstudio.com
        </span>
      </div>
      {items.map((t) => (
        <div
          key={t}
          className="p-item flex items-center gap-2.5 rounded-lg bg-white/[0.07] px-3 py-1.5 text-[11px] text-white/90 motion-safe:invisible"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[10px] text-[#09091F]">
            <HiCheck />
          </span>
          {t}
        </div>
      ))}
    </div>
  );
}

/* 05 · Grow: a rising line and a monthly report */
function GrowVisual() {
  return (
    <div className="flex h-full flex-col gap-2 p-4 text-left">
      <div className="p-item flex items-end justify-between motion-safe:invisible">
        <div>
          <p className="text-[10px] text-indigo-200/70">Enquiries this month</p>
          <p className="text-2xl font-black leading-none text-white">
            <span data-count data-to="48" data-final="48">
              48
            </span>
          </p>
        </div>
        <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
          ↑ 22%
        </span>
      </div>
      <svg
        viewBox="0 0 200 70"
        preserveAspectRatio="none"
        className="min-h-[3.5rem] w-full flex-1"
      >
        <defs>
          <linearGradient id="proc-grow-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="p-item motion-safe:invisible"
          d="M0,58 C20,52 30,54 50,44 S80,40 100,30 S140,24 160,14 S190,10 200,6 L200,70 L0,70 Z"
          fill="url(#proc-grow-fill)"
        />
        <path
          className="p-draw"
          d="M0,58 C20,52 30,54 50,44 S80,40 100,30 S140,24 160,14 S190,10 200,6"
          fill="none"
          stroke="#a5b4fc"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="0"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/* ---------- Content ---------- */

const steps = [
  {
    n: "1",
    h: "Growth Audit",
    p: "We review your website, Google Maps listing, Instagram, ads and competitors.",
    t: "Day 1–2",
    get: "A scored audit and your top 5 fixes",
    Visual: AuditVisual,
  },
  {
    n: "2",
    h: "Strategy",
    p: "A written plan: sitemap, channels, budget and what to fix first.",
    t: "Day 3–5",
    get: "A written plan and a fixed quote",
    Visual: StrategyVisual,
  },
  {
    n: "3",
    h: "Build",
    p: "Website, SEO, Google profile and WhatsApp automation, set up in your aesthetic.",
    t: "Week 1–3",
    get: "A private preview link to review",
    Visual: BuildVisual,
  },
  {
    n: "4",
    h: "Launch",
    p: "Live, tracked and handed over. Ads and content go out.",
    t: "Week 3–4",
    get: "Source code and logins, all yours",
    Visual: LaunchVisual,
  },
  {
    n: "5",
    h: "Grow",
    p: "Monthly optimisation and a report on enquiries and cost per lead.",
    t: "Every month",
    get: "A monthly report and strategy call",
    Visual: GrowVisual,
  },
];

/* ---------- Section ---------- */

export default function InteriorProcess() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = sectionRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);

      /* header */
      const head = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });
      head
        .fromTo(
          q(".p-eyebrow"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 },
        )
        .fromTo(
          q(".p-title"),
          { y: 36, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9 },
          "-=0.3",
        )
        .fromTo(
          q(".p-sub"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          "-=0.5",
        );
      ScrollTrigger.create({
        trigger: q(".p-header")[0],
        start: "top 85%",
        onEnter: () => head.restart(),
        onEnterBack: () => head.restart(),
        onLeave: () => head.pause(0),
        onLeaveBack: () => head.pause(0),
      });

      /* the line fills as you scroll */
      const line = q("[data-line]")[0];
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-steps]")[0],
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );

      /* each step */
      const cleanups = [];
      gsap.utils.toArray(q("[data-step]")).forEach((step) => {
        const sq = gsap.utils.selector(step);
        const node = sq("[data-node]")[0];
        const counts = sq("[data-count]");
        const zero = () =>
          counts.forEach((el) => {
            el.textContent = format(0, el);
          });
        zero();
        node.dataset.active = "false";

        // number lights up once the line reaches it, and dims when you scroll back up
        ScrollTrigger.create({
          trigger: step,
          start: "top 62%",
          end: "max",
          onToggle: (self) => {
            node.dataset.active = String(self.isActive);
          },
        });

        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });
        tl.fromTo(
          sq(".p-card"),
          { y: 50, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
        )
          .fromTo(
            sq(".p-item"),
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.09 },
            0.3,
          )
          .fromTo(
            sq(".p-bar"),
            { scaleX: 0 },
            { scaleX: 1, duration: 1, stagger: 0.15, ease: "power2.out" },
            0.5,
          )
          .fromTo(
            sq(".p-draw"),
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" },
            0.5,
          );
        counts.forEach((el) => {
          const obj = { v: 0 };
          tl.to(
            obj,
            {
              v: Number(el.dataset.to),
              duration: 1.3,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = format(obj.v, el);
              },
            },
            0.6,
          );
        });

        const reset = () => {
          tl.pause(0);
          zero();
        };
        ScrollTrigger.create({
          trigger: step,
          start: "top 80%",
          onEnter: () => tl.restart(),
          onEnterBack: () => tl.restart(),
          onLeave: reset,
          onLeaveBack: reset,
        });

        cleanups.push(() => {
          node.dataset.active = "true";
          counts.forEach((el) => {
            el.textContent = el.dataset.final;
          });
        });
      });

      /* closing line */
      gsap.fromTo(
        q(".p-end"),
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: q(".p-end")[0],
            start: "top 92%",
            toggleActions: "play reset play reset",
          },
        },
      );

      return () => cleanups.forEach((fn) => fn());
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="p-header">
          <div className="p-eyebrow motion-safe:invisible">
            <Eyebrow>How it works</Eyebrow>
          </div>
          <h2 className="p-title max-w-4xl text-5xl font-black leading-[48px] tracking-tighter text-gray-900 motion-safe:invisible dark:text-white md:text-6xl md:leading-[68px] xl:text-7xl xl:leading-[80px]">
            From audit to growth,{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text italic text-transparent dark:from-indigo-300 dark:to-indigo-500">
              step by step.
            </span>
          </h2>
          <p className="p-sub mb-14 mt-6 max-w-2xl text-lg text-gray-700 motion-safe:invisible dark:text-gray-400 md:mb-20">
            Scope and price are agreed in writing before work begins. No
            surprises, and you know what you get at every step.
          </p>
        </div>

        {/* Timeline */}
        <div data-steps className="relative">
          {/* track + the line that fills as you scroll */}
          <div
            aria-hidden="true"
            className="absolute bottom-12 left-5 top-12 w-px -translate-x-1/2 bg-gray-200 dark:bg-white/10 md:left-1/2"
          >
            <div
              data-line
              className="h-full w-full origin-top bg-gradient-to-b from-indigo-500 to-indigo-700"
            />
          </div>

          <ol className="grid gap-10 md:gap-16">
            {steps.map((s, i) => {
              const Visual = s.Visual;
              return (
                <li
                  key={s.n}
                  data-step
                  className="relative pl-14 md:grid md:grid-cols-2 md:gap-x-24 md:pl-0"
                >
                  <span
                    data-node
                    data-active="true"
                    className="absolute left-0 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-black text-gray-500 transition-all duration-300 data-[active=true]:border-indigo-600 data-[active=true]:bg-indigo-600 data-[active=true]:text-white data-[active=true]:shadow-[0_0_0_6px_rgba(79,70,229,0.15)] dark:border-white/20 dark:bg-gray-900 md:left-1/2 md:-translate-x-1/2"
                  >
                    {s.n}
                  </span>

                  <div
                    className={`p-card motion-safe:invisible ${i % 2 ? "md:col-start-2" : "md:col-start-1"}`}
                  >
                    <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-white/5 md:p-5">
                      <div
                        aria-hidden="true"
                        className="relative h-48 overflow-hidden rounded-2xl bg-gradient-to-br from-[#09091F] via-[#17134F] to-[#30218A] ring-1 ring-black/5"
                      >
                        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl" />
                        <div className="relative h-full">
                          <Visual />
                        </div>
                      </div>

                      <div className="px-1 pb-1 pt-5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                            {s.t}
                          </span>
                          <span className="text-sm font-bold text-gray-400 dark:text-gray-500">
                            Step {s.n} of {steps.length}
                          </span>
                        </div>
                        <h3 className="mb-2 mt-4 text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                          {s.h}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-400">
                          {s.p}
                        </p>
                        <p className="mt-4 flex items-start gap-2 border-t border-dashed border-gray-300 pt-4 text-sm font-semibold text-indigo-700 dark:border-white/15 dark:text-indigo-300">
                          <HiCheck className="mt-0.5 shrink-0" />
                          You get: {s.get}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Visuals are illustrative examples, not real client data.
        </p>

        {/* Closing line */}
        <div className="p-end mt-10 flex flex-col items-center justify-between gap-6 border-t border-gray-200 pt-8 motion-safe:invisible dark:border-white/10 md:flex-row">
          <p className="text-center text-lg text-gray-700 dark:text-gray-400 md:text-start">
            Most studios go from audit to a live site in 2-3 weeks.
          </p>
          <a
            href="#contact"
            className="block whitespace-nowrap rounded-md border border-indigo-700 bg-indigo-700 px-4 py-3 text-lg font-bold text-white transition hover:bg-indigo-800"
          >
            Start with a Free Audit{" "}
            <HiArrowUpRight className="inline-block text-lg" />
          </a>
        </div>
      </div>
    </section>
  );
}

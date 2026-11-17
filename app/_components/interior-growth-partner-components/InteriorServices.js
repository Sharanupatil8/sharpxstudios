"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiArrowUpRight,
  HiOutlineBolt,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
  HiOutlineMagnifyingGlass,
  HiOutlineMegaphone,
  HiOutlinePaintBrush,
} from "react-icons/hi2";

/* Services section: six equal cards, each with the same layout:
   [ visual panel ]  [ icon · tag · number ]  [ title ]  [ text ]  [ chips ]

   gsap: every card rises in on scroll, then its visual "plays" once:
   - data-pop   : elements fade/slide in one after another
   - data-pin   : map pins drop in
   - data-ring  : PageSpeed gauges fill up (data-score)
   - data-count : numbers count up (data-to, data-dec, data-suffix)
   - data-kb    : slow zoom on photos
   With "reduce motion" nothing is hidden or animated, the final state just shows. */

const HERO_IMAGE = "/assets/interior-hero-img.png";
const RING = 113.1; // circumference of the gauge circle (r = 18)

const Eyebrow = ({ children }) => (
  <div className="mb-6 flex items-center gap-3">
    <span className="h-px w-7 shrink-0 bg-indigo-600" />
    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-400">
      {children}
    </p>
  </div>
);

/* A gradient sits behind every photo, so a panel still looks fine while the image loads. */
function Img({ pos = "object-center" }) {
  return (
    <Image
      src={HERO_IMAGE}
      alt=""
      fill
      sizes="(max-width: 768px) 90vw, 400px"
      className={`object-cover ${pos}`}
    />
  );
}

/* ---------- Visuals (all fill the same panel) ---------- */

/* 01 · Portfolio website */
function WebsiteVisual() {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg bg-[#0d0c2e] shadow-xl ring-1 ring-white/10">
        <div className="flex items-center gap-1.5 bg-white/[0.07] px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 flex-1 truncate rounded bg-white/10 px-2 py-0.5 text-[10px] text-indigo-100/70">
            yourstudio.com
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#ead9bf] via-[#c79f76] to-[#7d5c43]">
          <div data-kb className="absolute inset-0">
            <Img />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/45" />

          <div
            data-pop
            className="absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2 text-[10px] text-white"
          >
            <span className="text-xs font-bold tracking-tight">
              Your Studio
            </span>
            <span className="rounded-full bg-white px-2.5 py-0.5 font-semibold text-[#09091F]">
              Enquire
            </span>
          </div>

          <div className="absolute inset-x-3 bottom-3 max-w-[80%] text-left text-white">
            <p data-pop className="text-[10px] text-white/75">
              Featured project · Living room
            </p>
            <p
              data-pop
              className="mt-0.5 text-base font-black leading-tight tracking-tight"
            >
              Spaces designed around the way you live.
            </p>
            <span
              data-pop
              className="mt-2 inline-block rounded-full bg-indigo-500 px-3 py-1 text-[10px] font-semibold"
            >
              View projects
            </span>
          </div>

          <span
            data-pop
            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[#25d366] px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            WhatsApp
          </span>
        </div>
      </div>
    </div>
  );
}

/* 02 · "Interior designers near me": a Google Maps style local result */
function SearchVisual() {
  return (
    <div className="flex h-full flex-col gap-2 p-3 text-left">
      <div
        data-pop
        className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] text-gray-700 shadow-md"
      >
        <HiOutlineMagnifyingGlass className="shrink-0 text-sm text-gray-500" />
        <span className="truncate">interior designers near me</span>
      </div>

      <div
        data-pop
        className="flex flex-1 flex-col overflow-hidden rounded-xl bg-white shadow-xl"
      >
        {/* map */}
        <div className="relative h-[78px] shrink-0 overflow-hidden bg-[#e8eaed]">
          <svg
            viewBox="0 0 300 78"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
          >
            <rect x="196" y="6" width="70" height="30" rx="4" fill="#c8e6c9" />
            <path
              d="M0,60 C60,48 110,70 170,56 S260,40 300,50 L300,78 L0,78 Z"
              fill="#aadaff"
            />
            <path d="M0,30 L300,18" stroke="#fff" strokeWidth="8" />
            <path d="M82,0 L112,78" stroke="#fff" strokeWidth="8" />
            <path d="M190,0 L170,78" stroke="#fff" strokeWidth="5" />
            <path d="M0,30 L300,18" stroke="#fde293" strokeWidth="3" />
          </svg>

          {/* other studios */}
          <span
            data-pin
            className="absolute left-[18%] top-[26%] h-3 w-3 -translate-x-1/2"
          >
            <span className="block h-3 w-3 rotate-45 rounded-full rounded-br-none bg-[#9aa0a6]" />
          </span>
          <span
            data-pin
            className="absolute left-[78%] top-[18%] h-3 w-3 -translate-x-1/2"
          >
            <span className="block h-3 w-3 rotate-45 rounded-full rounded-br-none bg-[#9aa0a6]" />
          </span>

          {/* your studio */}
          <span
            data-pin
            className="absolute left-[48%] top-[22%] h-4 w-4 -translate-x-1/2"
          >
            <span className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 animate-ping rounded-full bg-[#ea4335]/40 motion-reduce:hidden" />
            <span className="relative flex h-4 w-4 rotate-45 items-center justify-center rounded-full rounded-br-none bg-[#ea4335] shadow">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          </span>
        </div>

        {/* business profile */}
        <div className="flex flex-1 flex-col justify-center gap-1 px-3 py-2">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[13px] font-semibold leading-tight text-[#202124]">
              Your Studio
            </p>
            <span className="shrink-0 rounded bg-indigo-600 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
              Top result
            </span>
          </div>
          <p className="flex items-center gap-1 text-[10px] text-[#5f6368]">
            <span className="font-medium text-[#202124]">4.9</span>
            <span className="tracking-tighter text-[#fbbc04]">★★★★★</span>
            <span>(86)</span> · Interior designer
          </p>
          <p className="text-[10px] text-[#5f6368]">
            Whitefield, Bangalore ·{" "}
            <span className="font-medium text-[#188038]">Open</span> · Closes 7
            pm
          </p>
          <div className="mt-0.5 flex gap-1.5">
            {["Call", "Directions", "Website"].map((b) => (
              <span
                key={b}
                className="rounded-full border border-[#dadce0] px-2.5 py-0.5 text-[9.5px] font-medium text-[#1a73e8]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 03 · WhatsApp assistant qualifying a lead */
function AutomationVisual() {
  return (
    <div className="flex h-full flex-col bg-[#0b141a] text-left">
      <div className="flex items-center gap-2.5 bg-[#202c33] px-3 py-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6a7175] text-[10px] font-bold text-white">
          C
        </span>
        <div className="leading-tight">
          <p className="text-[11px] font-semibold text-white/90">New enquiry</p>
          <p className="text-[9px] text-emerald-300/80">
            AI assistant · replying instantly
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2 px-3 text-[10.5px]">
        <p
          data-pop
          className="max-w-[82%] rounded-lg rounded-tl-none bg-[#202c33] px-2.5 py-1.5 text-white/90"
        >
          Hi, we want to redo our café. What&apos;s the process?
        </p>
        <p
          data-pop
          className="ml-auto max-w-[84%] rounded-lg rounded-tr-none bg-[#005c4b] px-2.5 py-1.5 text-white/95"
        >
          Happy to help! What&apos;s the size and budget?
        </p>
        <p
          data-pop
          className="max-w-[82%] rounded-lg rounded-tl-none bg-[#202c33] px-2.5 py-1.5 text-white/90"
        >
          About 800 sq ft. Budget ₹15–20 lakh.
        </p>
        <span
          data-pop
          className="mx-auto mt-0.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-400/30"
        >
          Lead qualified · Site visit requested
        </span>
      </div>
    </div>
  );
}

/* 04 · A Google search ad and a Meta feed ad */
function AdsVisual() {
  return (
    <div className="flex h-full flex-col gap-2 p-3 text-left">
      <div data-pop className="rounded-lg bg-[#202124] px-3 py-2 shadow-lg">
        <p className="text-[10px] text-[#bdc1c6]">
          <span className="font-bold text-[#e8eaed]">Ad</span> · yourstudio.com
        </p>
        <p className="truncate text-[12px] text-[#8ab4f8]">
          Interior Designers Near You | Free Site Visit
        </p>
        <p className="truncate text-[10px] text-[#bdc1c6]">
          Homes and offices designed and delivered on time.
        </p>
      </div>

      <div
        data-pop
        className="flex flex-1 flex-col overflow-hidden rounded-lg bg-white text-[#09091F] shadow-lg"
      >
        <div className="flex items-center gap-2 px-2.5 py-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[8px] font-bold text-white">
            Y
          </span>
          <p className="text-[10px] font-bold leading-none">
            Your Studio{" "}
            <span className="font-normal text-gray-500">· Sponsored</span>
          </p>
        </div>
        <div className="relative min-h-[2.5rem] flex-1 overflow-hidden bg-gradient-to-br from-[#ead9bf] to-[#7d5c43]">
          <div data-kb className="absolute inset-0">
            <Img pos="object-bottom" />
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-100 px-2.5 py-1.5">
          <span className="text-[10px] font-semibold">
            Book a free site visit
          </span>
          <span className="rounded bg-indigo-600 px-2 py-0.5 text-[9px] font-semibold text-white">
            Send message
          </span>
        </div>
      </div>
    </div>
  );
}

/* 05 · An Instagram profile */
function InstagramVisual() {
  const tiles = [
    { pos: "object-left" },
    { text: "Before & after", bg: "from-indigo-500 to-indigo-700" },
    { pos: "object-right" },
    { pos: "object-center" },
    { text: "Design tips", bg: "from-violet-500 to-fuchsia-600" },
    { pos: "object-top" },
    { pos: "object-bottom" },
    { text: "Client story", bg: "from-[#17134F] to-[#4f46e5]" },
  ];
  return (
    <div className="flex h-full flex-col p-4">
      <div data-pop className="mb-3 flex items-center gap-2.5 text-left">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-xs font-bold text-white ring-2 ring-white/30">
          Y
        </span>
        <div className="leading-tight">
          <p className="text-[12px] font-semibold text-white">
            yourstudio.interiors
          </p>
          <p className="text-[10px] text-indigo-200/70">
            Interior design studio
          </p>
        </div>
        <span className="ml-auto rounded-md bg-indigo-500 px-3 py-1 text-[10px] font-semibold text-white">
          Follow
        </span>
      </div>

      <div className="grid flex-1 grid-cols-4 grid-rows-2 gap-1">
        {tiles.map((t, i) => (
          <div
            key={i}
            data-pop
            className={`relative overflow-hidden rounded-[3px] bg-gradient-to-br ${
              t.bg ?? "from-[#ead9bf] to-[#7d5c43]"
            }`}
          >
            {t.text ? (
              <span className="absolute inset-0 flex items-center justify-center p-1 text-center text-[9px] font-black leading-tight text-white">
                {t.text}
              </span>
            ) : (
              <Img pos={t.pos} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 06 · SEO report + PageSpeed Insights style scores */
const gaugeStyle = (score) =>
  score >= 90
    ? { stroke: "#0cce6b", text: "text-[#018642]" }
    : score >= 50
      ? { stroke: "#ffa400", text: "text-[#c33300]" }
      : { stroke: "#ff4e42", text: "text-[#c7221f]" };

function Gauge({ label, score }) {
  const g = gaugeStyle(score);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-12 w-12">
        <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90">
          <circle cx="22" cy="22" r="18" fill={g.stroke} fillOpacity="0.1" />
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke={g.stroke}
            strokeOpacity="0.22"
            strokeWidth="3"
          />
          <circle
            data-ring
            data-score={score}
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke={g.stroke}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={RING}
            strokeDashoffset={RING * (1 - score / 100)}
          />
        </svg>
        <span
          data-count
          data-to={score}
          className={`absolute inset-0 flex items-center justify-center text-[14px] font-medium ${g.text}`}
        >
          {score}
        </span>
      </div>
      <span className="text-[8.5px] font-medium leading-none text-[#5f6368]">
        {label}
      </span>
    </div>
  );
}

function ReportVisual() {
  const vitals = [
    { k: "LCP", to: 1.1, dec: 1, suffix: " s" },
    { k: "CLS", to: 0, dec: 0, suffix: "" },
    { k: "INP", to: 120, dec: 0, suffix: " ms" },
  ];
  return (
    <div className="flex h-full flex-col p-3 text-left">
      <div className="flex flex-1 flex-col rounded-xl bg-white px-3 py-2.5 shadow-xl">
        <div data-pop className="flex items-center justify-between">
          <p className="text-[11px] font-semibold text-[#202124]">
            PageSpeed Insights
          </p>
          <span className="rounded-full bg-[#e6f4ea] px-2 py-0.5 text-[9px] font-semibold text-[#137333]">
            Core Web Vitals · Passed
          </span>
        </div>

        <div data-pop className="mt-2.5 grid grid-cols-4 gap-1">
          <Gauge label="Performance" score={98} />
          <Gauge label="Accessibility" score={96} />
          <Gauge label="Best Practices" score={100} />
          <Gauge label="SEO" score={100} />
        </div>

        <div
          data-pop
          className="mt-2.5 grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-200 pt-2"
        >
          {vitals.map((v) => (
            <div key={v.k} className="px-2 first:pl-0">
              <p className="text-[9px] text-[#5f6368]">{v.k}</p>
              <p className="flex items-center gap-1 text-[12px] font-semibold text-[#202124]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0cce6b]" />
                <span
                  data-count
                  data-to={v.to}
                  data-dec={v.dec}
                  data-suffix={v.suffix}
                >
                  {v.to.toFixed(v.dec)}
                  {v.suffix}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div
          data-pop
          className="mt-auto flex items-center justify-between rounded-md bg-[#f1f3f4] px-2.5 py-1.5 text-[10px] text-[#5f6368]"
        >
          <span>Keywords in top 3</span>
          <span className="font-semibold text-[#202124]">
            <span data-count data-to="12">
              12
            </span>{" "}
            <span className="text-[#188038]">↑ 4</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Content ---------- */

const services = [
  {
    icon: HiOutlineGlobeAlt,
    n: "01",
    kind: "Core",
    h: "Portfolio Website",
    p: "Fast, image-first project pages with before/after, materials and location, built the way clients research. WhatsApp one tap away.",
    tags: ["Next.js", "Mobile-first", "Case studies"],
    Visual: WebsiteVisual,
    gap: 0.18,
  },
  {
    icon: HiOutlineMagnifyingGlass,
    n: "02",
    kind: "Core",
    h: "Local SEO & Google Maps",
    p: "Be the studio people find when they search “interior designers near me”: an optimised Google Business Profile, area pages, reviews and AI-search (AEO/GEO) structure.",
    tags: ["Near me", "Google profile", "Reviews", "AEO / GEO"],
    Visual: SearchVisual,
    gap: 0.25,
  },
  {
    icon: HiOutlineBolt,
    n: "03",
    kind: "Add-on",
    h: "AI Lead Automation",
    p: "Instant WhatsApp replies, leads qualified by budget, project type and timeline, and follow-ups until the site visit is booked.",
    tags: ["WhatsApp", "AI agent", "CRM"],
    Visual: AutomationVisual,
    gap: 0.75,
  },
  {
    icon: HiOutlineMegaphone,
    n: "04",
    kind: "Add-on",
    h: "Ads That Bring Enquiries",
    p: "Meta and Google ads aimed at people planning interiors now, judged by cost per enquiry and per site visit.",
    tags: ["Meta ads", "Google ads", "Cost per lead"],
    Visual: AdsVisual,
    gap: 0.35,
  },
  {
    icon: HiOutlinePaintBrush,
    n: "05",
    kind: "Add-on",
    h: "Content & Brand Design",
    p: "Reels, posts, carousels and brand visuals made from your real projects, so your work reaches people who don't follow you yet.",
    tags: ["Reels", "Social posts", "Graphic design"],
    Visual: InstagramVisual,
    gap: 0.07,
  },
  {
    icon: HiOutlineChartBar,
    n: "06",
    kind: "Add-on",
    h: "SEO & Speed Reports",
    p: "A monthly report you can read in two minutes: rankings, PageSpeed and Core Web Vitals, enquiries and cost per lead. Hosting and fixes included. You own the code.",
    tags: ["PageSpeed", "Core Web Vitals", "SEO report"],
    Visual: ReportVisual,
    gap: 0.25,
  },
];

/* ---------- Section ---------- */

const format = (v, el) =>
  `${Number(v).toFixed(Number(el.dataset.dec || 0))}${el.dataset.suffix || ""}`;

export function InteriorServices() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // "reduce motion": leave everything in its final state
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-svc]").forEach((card, i) => {
        const q = gsap.utils.selector(card);
        const gap = Number(card.dataset.gap || 0.15);
        const pops = q("[data-pop]");
        const pins = q("[data-pin]");
        const rings = q("[data-ring]");
        const counts = q("[data-count]");
        const photos = q("[data-kb]");

        // the card itself rises in (staggered by column)
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: (i % 3) * 0.12,
          ease: "power3.out",
          // plays on entering (from either side), resets when fully out of view
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play reset play reset",
          },
        });

        // hidden starting state for the visual
        gsap.set(pops, { opacity: 0, y: 14, scale: 0.96 });
        gsap.set(pins, { opacity: 0, y: -18 });
        gsap.set(photos, { scale: 1.15 });
        gsap.set(rings, { strokeDashoffset: RING });
        counts.forEach((el) => {
          el.textContent = format(0, el);
        });

        // the visual plays once, shortly after the card is in view
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });
        tl.to(photos, { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
          .to(
            pops,
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: gap },
            0.15,
          )
          .to(
            pins,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "bounce.out",
              stagger: 0.18,
            },
            0.5,
          );

        rings.forEach((r) => {
          const score = Number(r.dataset.score);
          tl.to(
            r,
            {
              strokeDashoffset: RING * (1 - score / 100),
              duration: 1.4,
              ease: "power2.out",
            },
            0.6,
          );
        });
        counts.forEach((el) => {
          const obj = { v: 0 };
          tl.to(
            obj,
            {
              v: Number(el.dataset.to),
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = format(obj.v, el);
              },
            },
            0.6,
          );
        });

        // replay every time the card comes into view; reset once it is out of view
        const play = () => tl.restart();
        const reset = () => {
          tl.pause(0);
          counts.forEach((el) => {
            el.textContent = format(0, el);
          });
        };
        ScrollTrigger.create({
          trigger: card,
          start: "top 82%",
          onEnter: play,
          onEnterBack: play,
          onLeave: reset,
          onLeaveBack: reset,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative isolate overflow-hidden bg-gray-50 py-20 dark:bg-white/[.03] md:py-28"
    >
      {/* Background: faint notebook rules that fade out downwards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [--rule:rgba(79,70,229,0.08)] dark:[--rule:rgba(165,180,252,0.08)]"
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_47px,var(--rule)_47px,var(--rule)_48px)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div data-reveal>
          <Eyebrow>One team, every channel</Eyebrow>
          <h2 className="max-w-4xl text-5xl font-black leading-[48px] tracking-tighter text-gray-900 dark:text-white md:text-6xl md:leading-[68px] xl:text-7xl xl:leading-[80px]">
            More than a website. A system that{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text italic text-transparent dark:from-indigo-300 dark:to-indigo-500">
              brings clients.
            </span>
          </h2>
          <p className="mb-14 mt-6 max-w-2xl text-lg text-gray-700 dark:text-gray-400">
            A beautiful site nobody finds, or nobody answers, doesn&apos;t win
            projects. Start with the website and search, and add automation, ads
            and content as you grow. We build and run every step.
          </p>
        </div>

        {/* Six equal cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            const Visual = s.Visual;
            return (
              <article key={s.n} data-svc data-gap={s.gap}>
                {/* Hover lives on this inner element so it never fights the entrance animation */}
                <div className="group flex h-full flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-white/5 md:p-5">
                  <div
                    aria-hidden="true"
                    className="relative h-64 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#09091F] via-[#17134F] to-[#30218A] ring-1 ring-black/5"
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl" />
                    <div className="relative h-full">
                      <Visual />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-1 pb-1">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-2xl text-white shadow-lg shadow-indigo-500/25 transition duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        <Icon />
                      </span>
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${
                            s.kind === "Core"
                              ? "bg-indigo-600 text-white"
                              : "border border-gray-300 text-gray-500 dark:border-white/20 dark:text-gray-400"
                          }`}
                        >
                          {s.kind}
                        </span>
                        <span className="text-sm font-bold text-gray-400 dark:text-gray-500">
                          {s.n}
                        </span>
                      </div>
                    </div>

                    <h3 className="mb-2 mt-4 text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                      {s.h}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-400">{s.p}</p>

                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-indigo-600/20 bg-indigo-600/5 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Visuals are illustrative examples, not real client data.
        </p>

        {/* Closing call to action */}
        <div
          data-reveal
          className="mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-br from-[#09091F] via-[#17134F] to-[#30218A] p-8 text-center md:flex-row md:p-10 md:text-start"
        >
          <div>
            <p className="text-2xl font-black tracking-tight text-white md:text-3xl">
              Want all six working for your studio?
            </p>
            <p className="mt-2 text-gray-300">
              Start with a free growth audit. We&apos;ll show you where
              enquiries are slipping away today.
            </p>
          </div>
          <a
            href="#contact"
            className="block whitespace-nowrap rounded-md border border-indigo-500 bg-indigo-600 px-4 py-3 text-lg font-bold text-white transition hover:bg-indigo-700"
          >
            Get a Free Growth Audit{" "}
            <HiArrowUpRight className="inline-block text-lg" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default InteriorServices;

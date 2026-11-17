"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import {
  HiArrowUpRight,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMapPin,
} from "react-icons/hi2";

/* Footer on the light background (Contact above is dark), with the same notebook
   rules, margin line and ruler ticks as the other sections. The line colours are
   CSS variables: a darker indigo on the white footer, the lighter one in dark mode.
   gsap: columns rise in one after another and the wordmark slides up; it replays
   when you scroll back. GSAP owns the hidden "before" state (nothing is hidden in
   CSS), and "reduce motion" visitors just see the final state. */

const WA = "918050923077";
const AUDIT = `https://wa.me/${WA}?text=${encodeURIComponent(
  "Hi! I'd like a free growth audit for my interior / architecture studio.",
)}`;

const services = [
  "Portfolio websites",
  "Local SEO & Google Maps",
  "AI lead automation",
  "Ads management",
  "Content & reels",
  "SEO & speed reports",
];

const links = [
  { t: "Services", h: "#services" },
  { t: "Case studies", h: "#work" },
  { t: "Process", h: "#process" },
  { t: "Pricing", h: "#pricing" },
  { t: "FAQ", h: "#faq" },
  { t: "Contact", h: "#contact" },
];

const linkClass =
  "text-gray-700 transition hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-300";

/* ---------- Background: notebook rules + ruler ticks (inline styles, so nothing depends on Tailwind) ---------- */

const fadeDown =
  "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)";
const fadeSides =
  "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)";

// light = darker indigo for the white footer, dark = the same lighter tones as the dark sections
const TONES = {
  light: {
    rule: "rgba(99,102,241,0.2)",
    major: "rgba(79,70,229,0.6)",
    minor: "rgba(79,70,229,0.32)",
  },
  dark: {
    rule: "rgba(165,180,252,0.11)",
    major: "rgba(199,210,254,0.5)",
    minor: "rgba(199,210,254,0.28)",
  },
};

const notebookLines = (t) => ({
  // backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 47px, ${t.rule} 47px, ${t.rule} 48px)`,
  // maskImage: fadeDown,
  // WebkitMaskImage: fadeDown,
});

const rulerTicks = (t) => ({
  backgroundImage: [
    `repeating-linear-gradient(to right, ${t.major} 0, ${t.major} 1px, transparent 1px, transparent 80px)`,
    `repeating-linear-gradient(to right, ${t.minor} 0, ${t.minor} 1px, transparent 1px, transparent 8px)`,
  ].join(","),
  backgroundSize: "100% 16px, 100% 8px",
  backgroundRepeat: "no-repeat",
  maskImage: fadeSides,
  WebkitMaskImage: fadeSides,
});

const marginLine = {
  left: "max(0.25rem, calc(50% - 40rem - 1rem))",
};

export default function InteriorFooter() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });
      tl.fromTo(
        q(".ft-col"),
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1 },
      )
        .fromTo(
          q(".ft-bar"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          q(".ft-mark"),
          { yPercent: 40, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1.1 },
          "-=0.6",
        );

      const play = () => tl.restart();
      const reset = () => tl.pause(0);
      const st = ScrollTrigger.create({
        trigger: root,
        start: "top 85%",
        onEnter: play,
        onEnterBack: play,
        onLeave: reset,
        onLeaveBack: reset,
      });
      if (st.isActive) play();

      // Layout can shift after fonts and images load, so re-measure the trigger.
      ScrollTrigger.refresh();
    });

    return () => mm.revert();
  }, []);

  return (
    <footer
      ref={rootRef}
      className="relative isolate overflow-hidden border-t border-gray-200 bg-white dark:border-white/10 dark:bg-transparent"
    >
      {/* Atmosphere: notebook rules, margin line and a ruler (light and dark versions) */}
      {["light", "dark"].map((mode) => (
        <div
          key={mode}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 ${
            mode === "light" ? "dark:hidden" : "hidden dark:block"
          }`}
        >
          <div
            className="absolute inset-0"
            style={notebookLines(TONES[mode])}
          />
          <div
            className={`absolute inset-y-0 w-px bg-gradient-to-b to-transparent ${
              mode === "light"
                ? "from-indigo-400/50 via-indigo-400/25"
                : "from-violet-300/30 via-violet-300/15"
            }`}
            style={marginLine}
          />
          <div
            className="absolute inset-x-0 top-0 h-4"
            style={rulerTicks(TONES[mode])}
          />
        </div>
      ))}

      <div className="mx-auto max-w-7xl px-4 pt-14 md:px-6 md:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div className="ft-col col-span-2 lg:col-span-1">
            <a
              href="https://www.sharpxstudios.com"
              aria-label="SharpXstudios home"
              className="block h-16 w-[100px]"
            >
              <Image
                src="/logo.png"
                width={100}
                height={80}
                alt="SharpXstudios"
                className="h-full w-full object-contain object-left"
              />
            </a>
            <p className="mt-4 max-w-sm text-gray-700 dark:text-gray-400">
              Websites, SEO, ads and AI lead automation for interior designers
              and architects. Built and run from RR Nagar, Bangalore.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-block whitespace-nowrap rounded-md border border-indigo-700 bg-indigo-700 px-4 py-3 text-base font-bold text-white transition hover:bg-indigo-800"
            >
              Get a Free Growth Audit{" "}
              <HiArrowUpRight className="inline-block text-lg" />
            </a>
          </div>

          {/* Services */}
          <nav aria-label="Services" className="ft-col">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Services
            </p>
            <ul className="grid gap-3">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className={linkClass}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* On this page */}
          <nav aria-label="On this page" className="ft-col">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              On this page
            </p>
            <ul className="grid gap-3">
              {links.map((l) => (
                <li key={l.t}>
                  <a href={l.h} className={linkClass}>
                    {l.t}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="ft-col col-span-2 lg:col-span-1">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Get in touch
            </p>
            <ul className="grid gap-4">
              <li>
                <a href={AUDIT} className="group flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-lg text-green-600">
                    <HiOutlineChatBubbleLeftRight />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-xs text-gray-500">
                      WhatsApp
                    </span>
                    <span className="font-semibold text-gray-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
                      +91 80509 23077
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-lg text-indigo-600 dark:text-indigo-300">
                  <HiOutlineMapPin />
                </span>
                <span className="leading-tight">
                  <span className="block text-xs text-gray-500">Studio</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    RR Nagar, Bangalore
                  </span>
                </span>
              </li>
            </ul>

            <div className="mt-6 flex gap-4">
              <a
                href="https://www.instagram.com/sharpxstudios"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SharpXstudios on Instagram"
                className="text-indigo-900 transition hover:scale-105 hover:text-indigo-600 dark:text-indigo-300"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/sharpxstudios"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SharpXstudios on LinkedIn"
                className="text-indigo-900 transition hover:scale-105 hover:text-indigo-600 dark:text-indigo-300"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar (extra bottom padding on phones keeps it clear of the sticky WhatsApp button) */}
        <div className="ft-bar mt-12 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pb-6 pt-6 text-sm text-gray-600 dark:border-white/10 dark:text-gray-400 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} SharpXstudios. All rights
            reserved.
          </p>
          <p className="flex items-center gap-4">
            <a
              href="https://www.sharpxstudios.com"
              className="transition hover:text-indigo-600"
            >
              sharpxstudios.com
            </a>
            <a
              href="#top"
              className="font-semibold text-indigo-700 transition hover:text-indigo-900 dark:text-indigo-300"
            >
              Back to top ↑
            </a>
          </p>
        </div>
      </div>

      {/* Decorative wordmark, partly cut off at the bottom */}
      <div
        aria-hidden="true"
        className="ft-mark pointer-events-none -mb-[2.6vw] select-none overflow-hidden text-center font-black leading-none tracking-tighter text-[13.5vw] md:-mb-[2vw]"
      >
        <span className="inline-block bg-gradient-to-b from-indigo-200/70 to-transparent bg-clip-text text-transparent dark:from-indigo-300/20">
          SharpXstudios
        </span>
      </div>

      {/* room for the sticky WhatsApp button on phones */}
      <div className="h-16 md:hidden" />
    </footer>
  );
}

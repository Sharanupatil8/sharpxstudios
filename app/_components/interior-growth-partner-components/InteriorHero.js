"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import {
  HiArrowUpRight,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { gsap } from "gsap";

/* Hero image: /public/assets/interior-hero-img.png */
const HERO_IMAGE = "/assets/hero-interior.jpg";

/* ---------- Background: notebook rules + ruler ticks ----------
   Colours come from CSS variables (set on the wrapper below), so the
   same lines look right in both light and dark mode. */

const fadeDown =
  "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)";
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

function InteriorHero() {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const avatarsRef = useRef(null);
  const visualRef = useRef(null);
  const imageInnerRef = useRef(null);
  const cardsLayerRef = useRef(null);

  useEffect(() => {
    // respect "reduce motion": content simply shows, no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
      })
        .from(
          headingRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.9,
          },
          "-=0.3",
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.4",
        )
        .from(
          buttonRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.3",
        )
        .from(
          avatarsRef.current?.children,
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5,
          },
          "-=0.3",
        )
        // image slides up + scales in alongside the text
        .from(
          visualRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.94,
            duration: 1.1,
          },
          0.3,
        )
        // floating cards pop in one after another
        .from(
          heroRef.current.querySelectorAll("[data-card]"),
          {
            opacity: 0,
            scale: 0.8,
            y: 20,
            stagger: 0.2,
            duration: 0.7,
            ease: "back.out(1.6)",
          },
          "-=0.5",
        );

      // gentle floating notification cards
      heroRef.current.querySelectorAll("[data-float]").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? 10 : -10,
          duration: 2.6 + i * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, heroRef);

    // subtle mouse parallax on large screens with a real pointer
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (min-width: 1024px)", () => {
      const el = heroRef.current;
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(imageInnerRef.current, {
          x: x * -14,
          y: y * -14,
          duration: 0.8,
          ease: "power2.out",
        });
        gsap.to(cardsLayerRef.current, {
          x: x * 22,
          y: y * 22,
          duration: 0.8,
          ease: "power2.out",
        });
      };
      el.addEventListener("mousemove", move);
      return () => el.removeEventListener("mousemove", move);
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative isolate h-full w-full overflow-hidden px-2 pt-8 md:px-4 md:pt-12"
    >
      {/* Background: notebook rules, margin line and ruler (behind everything) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [--rule:rgba(79,70,229,0.12)] [--tick-major:rgba(79,70,229,0.5)] [--tick-minor:rgba(79,70,229,0.28)] dark:[--rule:rgba(165,180,252,0.11)] dark:[--tick-major:rgba(199,210,254,0.5)] dark:[--tick-minor:rgba(199,210,254,0.28)]"
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

      {/* Main Hero Content */}
      <div className="relative z-40 mx-auto h-full max-w-7xl pb-12 md:px-6 lg:px-0 lg:pb-16">
        <div className="flex h-full w-full flex-col justify-center text-center md:text-start lg:me-auto lg:w-[58%]">
          {/* SEO / Hero Badge */}
          <div
            ref={badgeRef}
            className="mb-8 flex items-center justify-center gap-3 md:mt-0 md:justify-start"
          >
            <span className="hidden h-px w-7 shrink-0 bg-indigo-600 md:inline-block" />

            <h1 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-600">
              Digital Marketing & Websites for Interior Designers & Architects
              in Bangalore
            </h1>
          </div>

          {/* Main Heading */}
          <h2
            ref={headingRef}
            className="text-center text-5xl font-black leading-[48px] tracking-[-5px] text-gray-900 dark:text-white md:text-start md:text-6xl md:leading-[68px] xl:text-7xl xl:leading-[80px]"
          >
            We help
            <span className="ml-4 mb-4 hidden h-12 w-12 rotate-12 md:inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient
                    id="hero-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>

                <path
                  d="M12 2L14 9.5L22 12L14 14.5L12 22L10 14.5L2 12L10 9.5Z"
                  fill="url(#hero-gradient)"
                />
              </svg>
            </span>
            <br className="hidden lg:block" />
            <span className="inline-block bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent dark:from-indigo-300 capitalize italic dark:to-indigo-500">
              interior studios
            </span>
            <br />
            to get
            <span className="bg-gradient-to-r from-indigo-300 to-indigo-600 bg-clip-text text-transparent">
              &nbsp; found online .
            </span>
          </h2>

          {/* Description */}
          <p
            ref={descRef}
            className="mt-6 mb-4 text-center text-lg text-gray-700 dark:text-gray-400 md:mt-8 md:text-start"
          >
            <strong>SharpXStudios Interior Growth Partners in Bangalore</strong>
            , helps interior designers and architects grow with stunning
            portfolio websites, better Google visibility, and AI-powered
            automation that captures enquiries, qualifies leads, and books site
            visits effortlessly.
            {/* <span className="mt-3 block">
              Add AI automation that replies to every enquiry instantly,
              qualifies leads and books site visits, so you convert faster and
              your day-to-day work stays effortless.
            </span> */}
          </p>

          {/* CTA + Clients */}
          <div
            ref={buttonRef}
            className="mt-8 flex flex-col items-center gap-x-8 gap-y-6 md:mt-8 md:flex-row md:flex-wrap md:gap-y-5"
          >
            {/* CTA */}
            <a
              href="#contact"
              className="block whitespace-nowrap rounded-md border border-indigo-700 bg-indigo-700 px-4 py-3 text-lg font-bold text-white transition hover:bg-indigo-800"
            >
              Get a Free Growth Audit{" "}
              <HiArrowUpRight className="inline-block text-lg" />
            </a>

            {/* Client Avatars */}
            <div ref={avatarsRef} className="flex self-center">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className={n > 1 ? "-ms-4" : ""}>
                  <Image
                    src={`/assets/avatars/image-${n}.jpg`}
                    width={40}
                    height={40}
                    alt="SharpXstudios client"
                    className="h-12 w-12 rounded-full border-4 border-gray-200"
                  />
                </div>
              ))}

              <div className="ms-3 flex flex-col justify-start text-start">
                <p className="mb-0 pb-0 text-xl text-gray-700 dark:text-gray-300">
                  10+
                </p>

                <p className="mt-0 pt-0 text-sm text-gray-600 dark:text-gray-400">
                  Happy Clients
                </p>
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm text-gray-500">
            Free · No obligation · We reply within a few hours
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: HERO IMAGE + GLOW.
          Below lg it sits under the text; from lg up it floats on the right. */}
      <div
        ref={visualRef}
        className="pointer-events-none relative z-10 mx-auto mb-16 w-full max-w-[520px] lg:absolute lg:right-4 lg:top-1/2 lg:mb-0 lg:w-[340px] lg:max-w-none lg:-translate-y-1/2 xl:right-8 xl:w-[420px] 2xl:right-[6%]"
      >
        {/* Background Glow */}
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-700 opacity-60 blur-3xl sm:h-[360px] sm:w-[360px]" />

        <div
          ref={imageInnerRef}
          className="relative z-10 aspect-[4/3] overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-2xl shadow-indigo-500/25 dark:border-white/10 dark:bg-gray-900 md:aspect-[16/11] lg:aspect-[4/5]"
        >
          <Image
            src={HERO_IMAGE}
            alt="Interior design project showcased on a portfolio website"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* floating example cards (own layer so they can move with the mouse) */}
        <div ref={cardsLayerRef} className="absolute inset-0 z-20">
          <div
            data-card
            className="absolute right-3 top-3 sm:right-4 sm:top-5 lg:-right-2 lg:top-10 xl:-right-6"
          >
            <div
              data-float
              className="flex w-60 items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-gray-900 sm:w-72"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-green-600">
                <HiOutlineChatBubbleLeftRight className="text-xl" />
              </span>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  New enquiry
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  3BHK · Whitefield · replied in 8s
                </p>
              </div>
            </div>
          </div>

          <div
            data-card
            className="absolute bottom-3 left-3 sm:bottom-5 sm:left-4 lg:-left-8 lg:bottom-12 xl:-left-12"
          >
            <div
              data-float
              className="flex w-60 items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-gray-900 sm:w-72"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-600">
                <HiOutlineCalendarDays className="text-xl" />
              </span>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Site visit booked
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Saturday · 11:00 AM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteriorHero;

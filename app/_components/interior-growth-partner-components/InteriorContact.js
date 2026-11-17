"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiArrowUpRight,
  HiCheck,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMapPin,
} from "react-icons/hi2";
import LeadForm from "./LeadForm";

/* Contact on the dark notebook + ruler background (FAQ above is white).
   The form sits on a white card so it is the clear focus.
   gsap: heading lines slide up, the left column and the form card rise in,
   the 3 steps draw one after another, and everything replays when you scroll
   back ("reduce motion" visitors just see the final state). */

const WA = "918050923077";
const AUDIT = `https://wa.me/${WA}?text=${encodeURIComponent(
  "Hi! I'd like a free growth audit for my interior / architecture studio.",
)}`;

const gets = [
  "Scores for your website, Google listing and social presence",
  "How you compare to studios in your area",
  "Your top 5 fixes, in order of impact",
  "A 30-day plan you can start on right away",
];

const next = [
  {
    t: "You send your details",
    d: "It takes under a minute. We reply within a few hours.",
  },
  {
    t: "We review your studio",
    d: "Your website, Google profile, Instagram, ads and local competitors.",
  },
  {
    t: "You get your audit and plan",
    d: "Yours to keep. A short call only if you want one.",
  },
];

export default function InteriorContact() {
  const sectionRef = useRef(null);
  const [done, setDone] = useState(false); // form submitted: show only the thank-you

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = sectionRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);

      const replay = (trigger, tl, start) =>
        ScrollTrigger.create({
          trigger,
          start,
          onEnter: () => tl.restart(),
          onEnterBack: () => tl.restart(),
          onLeave: () => tl.pause(0),
          onLeaveBack: () => tl.pause(0),
        });

      /* left column */
      const left = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });
      left
        .fromTo(
          q(".k-eyebrow"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 },
        )
        .fromTo(
          q(".k-line"),
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.14 },
          "-=0.3",
        )
        .fromTo(
          q(".k-item"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 },
          "-=0.5",
        )
        .fromTo(
          q(".k-draw"),
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, duration: 1, ease: "power2.inOut" },
          "-=0.8",
        );
      replay(q(".k-left")[0], left, "top 80%");

      /* form card */
      const card = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });
      card
        .fromTo(
          q(".k-card"),
          { y: 50, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9 },
        )
        .fromTo(
          q(".k-card-in"),
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06 },
          0.35,
        );
      replay(q(".k-card")[0], card, "top 85%");
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative isolate w-full overflow-hidden bg-gradient-to-br from-[#09091F] via-[#17134F] to-[#30218A] px-2 py-16 text-white md:px-4 md:py-24 lg:py-28"
    >
      {/* Atmosphere: soft glows, notebook rules, margin line and a ruler */}
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[450px] w-[450px] rounded-full bg-violet-500/20 blur-[140px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[image:repeating-linear-gradient(to_bottom,transparent_0,transparent_47px,rgba(165,180,252,0.11)_47px,rgba(165,180,252,0.11)_48px)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[max(0.25rem,calc(50%_-_40rem_-_1rem))] -z-10 w-px bg-gradient-to-b from-violet-300/30 via-violet-300/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-4 bg-[image:repeating-linear-gradient(to_right,rgba(199,210,254,0.5)_0,rgba(199,210,254,0.5)_1px,transparent_1px,transparent_80px),repeating-linear-gradient(to_right,rgba(199,210,254,0.28)_0,rgba(199,210,254,0.28)_1px,transparent_1px,transparent_8px)] bg-no-repeat [background-size:100%_16px,100%_8px] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:px-6 lg:grid-cols-[6fr_5fr] lg:gap-16 lg:px-0">
        {/* Left: what you get, what happens next, how to reach us */}
        <div className="k-left min-w-0">
          <div className="k-eyebrow mb-8 flex items-center justify-center gap-3 motion-safe:invisible md:justify-start">
            <span className="hidden h-px w-7 shrink-0 bg-indigo-300 md:inline-block" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-300">
              Start here
            </p>
          </div>

          <h2 className="text-center text-5xl font-black leading-[48px] tracking-tighter text-white md:text-start md:text-6xl md:leading-[68px] xl:text-7xl xl:leading-[80px]">
            <span className="block overflow-hidden pb-2">
              <span className="k-line block motion-safe:invisible">
                Get your free
              </span>
            </span>
            <span className="block overflow-hidden pb-3">
              <span className="k-line block bg-gradient-to-r from-indigo-300 to-indigo-500 bg-clip-text pr-2 italic text-transparent motion-safe:invisible">
                growth audit.
              </span>
            </span>
          </h2>

          <p className="k-item mt-6 max-w-xl text-center text-lg text-gray-300 motion-safe:invisible md:text-start">
            Send us your studio&apos;s details. We&apos;ll review your website,
            Google profile, Instagram and ads, and send back:
          </p>

          <ul className="mt-6 grid max-w-xl gap-3 text-gray-100">
            {gets.map((t) => (
              <li
                key={t}
                className="k-item flex items-start gap-2.5 motion-safe:invisible"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/25 text-xs text-indigo-200">
                  <HiCheck />
                </span>
                {t}
              </li>
            ))}
          </ul>

          {/* What happens next */}
          <div className="k-item mt-10 max-w-xl motion-safe:invisible">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
              What happens next
            </p>
            <ol className="relative grid gap-5">
              <span
                aria-hidden="true"
                className="k-draw absolute bottom-3 left-[15px] top-3 w-px bg-gradient-to-b from-indigo-400/70 to-indigo-400/10"
              />
              {next.map((s, i) => (
                <li key={s.t} className="relative flex gap-4">
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-white">{s.t}</p>
                    <p className="text-sm text-gray-400">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Reach us */}
          <div className="k-item mt-10 grid max-w-xl gap-3 border-t border-white/10 pt-6 text-gray-300 motion-safe:invisible sm:grid-cols-2">
            <a
              href={AUDIT}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-indigo-300/40 hover:bg-white/[0.08]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-xl text-green-400">
                <HiOutlineChatBubbleLeftRight />
              </span>
              <span className="leading-tight">
                <span className="block text-xs text-gray-400">WhatsApp</span>
                <span className="font-semibold text-white group-hover:text-indigo-200">
                  +91 80509 23077
                </span>
              </span>
            </a>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-xl text-indigo-300">
                <HiOutlineMapPin />
              </span>
              <span className="leading-tight">
                <span className="block text-xs text-gray-400">Studio</span>
                <span className="font-semibold text-white">
                  RR Nagar, Bangalore
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: the form on a white card */}
        <div className="k-card min-w-0 self-start rounded-3xl bg-white p-6 shadow-2xl shadow-black/40 motion-safe:invisible dark:bg-gray-900 dark:ring-1 dark:ring-white/10 md:p-8 lg:sticky lg:top-24">
          {!done && (
            <div className="k-card-in motion-safe:invisible">
              <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white md:text-3xl">
                Tell us about your studio
              </h3>
              <p className="mb-6 mt-2 text-gray-600 dark:text-gray-400">
                Takes under a minute. We reply within a few hours.
              </p>
            </div>
          )}
          <div className="k-card-in motion-safe:invisible">
            <LeadForm onStatusChange={(s) => setDone(s === "done")} />
          </div>
          {!done && (
            <a
              href={AUDIT}
              className="k-card-in mt-5 flex items-center justify-center gap-1.5 border-t border-gray-200 pt-5 text-base font-bold text-green-700 transition hover:text-green-800 motion-safe:invisible dark:border-white/10 dark:text-green-400"
            >
              Prefer WhatsApp? Chat with us <HiArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

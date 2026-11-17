"use client";

import { useRef } from "react";
import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ---------- Background: notebook rules + ruler ticks ---------- */

const fadeDown =
  "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)";
const fadeSides =
  "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)";

// Horizontal ruled lines, like a notebook page (one line every 48px)
const notebookLines = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, transparent 0, transparent 47px, rgba(165,180,252,0.11) 47px, rgba(165,180,252,0.11) 48px)",
  maskImage: fadeDown,
  WebkitMaskImage: fadeDown,
};

// Ruler along the top edge: a small tick every 8px, a tall tick every 80px
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

/* ---------- Images ----------
   Drop your photos in /public/assets/journey/ (or change the paths here).
   While a file is missing, the gradient behind each photo shows instead. */

const IMAGES = {
  home: "/home-interior.jpg",
  office: "/office-interior.jpg",
  retail: "/retail-interior.jpg",
  salonA: "/salon-1.jpg",
  salonB: "/salon-2.jpg",
};

/* ---------- Mini scenes: small UI moments that show each step ---------- */

function SearchScene() {
  // Looks like Google local results in dark mode, with your studio ranked first
  return (
    <div className="-m-4 flex h-[calc(100%+2rem)] flex-col gap-2 bg-[#202124] px-3 pb-2 pt-3 text-left">
      {/* Search bar */}
      <div className="v-item flex items-center gap-2 rounded-full bg-[#303134] px-3 py-1.5 text-xs text-[#e8eaed] motion-safe:invisible">
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 shrink-0 text-[#9aa0a6]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        interior designers near me
      </div>

      {/* Your studio: first result */}
      <div className="v-item flex gap-2.5 rounded-lg bg-indigo-400/10 p-2 ring-1 ring-indigo-400/40 motion-safe:invisible">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-[#ead9bf] via-[#c79f76] to-[#7d5c43]">
          <Image
            src={IMAGES.home}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[13px] font-medium text-[#8ab4f8]">
            Your Studio
          </p>
          <p className="mt-0.5 text-[10px] text-[#bdc1c6]">
            4.9 <span className="text-[#fbbc04]">★★★★★</span> (86) · Interior
            designer
          </p>
          <p className="mt-0.5 text-[10px] text-[#bdc1c6]">
            <span className="text-[#81c995]">Open</span> · Closes 7 pm
          </p>
          <div className="mt-1.5 flex gap-1.5">
            <span className="rounded-full border border-white/20 px-2 py-px text-[9px] text-[#8ab4f8]">
              Website
            </span>
            <span className="rounded-full border border-white/20 px-2 py-px text-[9px] text-[#8ab4f8]">
              Directions
            </span>
          </div>
        </div>
      </div>

      {/* Other results, kept quiet */}
      <div className="v-item flex gap-2.5 px-2 opacity-60 motion-safe:invisible">
        <div className="h-8 w-8 shrink-0 rounded-md bg-white/10" />
        <div className="leading-tight">
          <p className="text-[12px] text-[#8ab4f8]">Urban Nest Interiors</p>
          <p className="text-[10px] text-[#bdc1c6]">
            4.6 <span className="text-[#fbbc04]">★★★★★</span> (41)
          </p>
        </div>
      </div>
      <div className="v-item flex gap-2.5 px-2 opacity-40 motion-safe:invisible">
        <div className="h-8 w-8 shrink-0 rounded-md bg-white/10" />
        <div className="leading-tight">
          <p className="text-[12px] text-[#8ab4f8]">The Design Co.</p>
          <p className="text-[10px] text-[#bdc1c6]">
            4.4 <span className="text-[#fbbc04]">★★★★★</span> (23)
          </p>
        </div>
      </div>
    </div>
  );
}

function Photo({ src, gradient, className = "", children }) {
  return (
    <div
      className={`v-item relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} motion-safe:invisible ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 60vw, 280px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      {children}
    </div>
  );
}

function PortfolioScene() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-2">
        <Photo
          src={IMAGES.home}
          gradient="from-[#ead9bf] via-[#c79f76] to-[#7d5c43]"
          className="col-span-2 row-span-2"
        >
          <p className="absolute bottom-2.5 left-3 text-[11px] font-medium text-white/95">
            Home interior
          </p>
        </Photo>
        <Photo src={IMAGES.office} gradient="from-[#d6dde8] to-[#5f6f86]">
          <p className="absolute bottom-1.5 left-2 text-[10px] font-medium text-white/95">
            Office interior
          </p>
        </Photo>
        <Photo src={IMAGES.retail} gradient="from-[#bfe3d6] to-[#2f7a6d]">
          <p className="absolute bottom-1.5 left-2 text-[10px] font-medium text-white/95">
            Retail interior
          </p>
        </Photo>
      </div>
      <p className="v-item text-left text-[11px] text-indigo-200/75 motion-safe:invisible">
        <span className="text-amber-300">★★★★★</span> 4.9 from 86 clients
      </p>
    </div>
  );
}

function ChatScene() {
  // Looks like a WhatsApp chat, seen from the studio's side
  return (
    <div className="-m-4 flex h-[calc(100%+2rem)] flex-col bg-[#0b141a] text-left">
      {/* Chat header */}
      <div className="flex items-center gap-2.5 bg-[#202c33] px-3 py-1.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6a7175] text-[11px] font-bold text-white">
          S
        </span>
        <div className="leading-tight">
          <p className="text-xs font-semibold text-white/90">+91 98••• ••210</p>
          <p className="text-[10px] text-white/50">online</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-1.5 px-3 pb-2">
        {/* Client */}
        <div className="v-item max-w-[78%] rounded-lg rounded-tl-none bg-[#202c33] px-2.5 py-1.5 text-xs text-white/90 motion-safe:invisible">
          Hi, do you do salon interiors?
          <span className="ml-2 align-bottom text-[9px] text-white/45">
            10:42
          </span>
        </div>

        {/* Studio reply */}
        <div className="v-item ml-auto max-w-[82%] rounded-lg rounded-tr-none bg-[#005c4b] px-2.5 py-1.5 text-xs text-white/95 motion-safe:invisible">
          Yes, we do! Here are some of our recent salon projects 👇
          <span className="ml-2 align-bottom text-[9px] text-white/55">
            10:43 <span className="text-[#53bdeb]">✓✓</span>
          </span>
        </div>

        {/* Photos, shown as a WhatsApp album: two images side by side */}
        <div className="v-item ml-auto w-[72%] rounded-lg rounded-tr-none bg-[#005c4b] p-[3px] motion-safe:invisible">
          <div className="relative grid grid-cols-2 gap-[2px] overflow-hidden rounded-md">
            <div className="relative h-20 bg-gradient-to-br from-[#f3d5d0] via-[#d9a39b] to-[#9b6b63]">
              <Image
                src={IMAGES.salonA}
                alt=""
                fill
                sizes="140px"
                className="object-cover"
              />
            </div>
            <div className="relative h-20 bg-gradient-to-br from-[#4a4a52] via-[#2b2b31] to-[#b8955a]">
              <Image
                src={IMAGES.salonB}
                alt=""
                fill
                sizes="140px"
                className="object-cover"
              />
            </div>
            {/* Time stamp sits on top of the photos, like WhatsApp */}
            <span className="absolute bottom-1 right-1.5 rounded bg-black/45 px-1 text-[9px] text-white/90">
              10:43 <span className="text-[#53bdeb]">✓✓</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Content ---------- */

const steps = [
  {
    number: "1",
    moment: "Get found",
    Scene: SearchScene,
    title: "Your studio shows up when they search.",
    description:
      "Most clients, whether a family, a business or a developer, begin with a Google search like “interior designers near me.” A complete profile, fresh project photos and steady reviews keep you on the shortlist.",
    help: ["Google profile", "Local search", "Review requests"],
  },
  {
    number: "2",
    moment: "Stand out",
    Scene: PortfolioScene,
    title: "Your work convinces them before you speak.",
    description:
      "They scan your Instagram, website and reviews, looking for projects like theirs, whether a home, an office or a store. Clear project stories with photos of finished spaces show you have done this before.",
    help: ["Pages by project type", "Instagram polish", "Before and afters"],
  },
  {
    number: "3",
    moment: "Get chosen",
    Scene: ChatScene,
    title: "Your reply turns interest into a visit.",
    description:
      "They message several studios at once. A quick, friendly answer with a clear next step is what books the site visit.",
    help: ["WhatsApp quick replies", "Enquiry form", "Follow-up reminders"],
  },
];

/* ---------- Component ---------- */

export function InteriorClientJourney() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Everything starts hidden in CSS (motion-safe:invisible), so nothing
      // flashes before GSAP runs. Reduced-motion visitors see it all at once.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true, // plays once, never reverses, so no re-trigger flicker
          },
        });

        tl.fromTo(
          ".j-eyebrow",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 },
        )
          .fromTo(
            ".j-line",
            { yPercent: 110, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.14 },
            "-=0.3",
          )
          .fromTo(
            ".j-node",
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.12 },
            "-=0.5",
          )
          .fromTo(
            ".j-draw",
            { scaleX: 0, autoAlpha: 1, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.9, stagger: 0.12, ease: "power2.inOut" },
            "<",
          )
          .fromTo(
            ".j-card",
            { y: 36, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.14 },
            "-=0.6",
          )
          .fromTo(
            ".v-item",
            { y: 10, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06 },
            "-=0.5",
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="client-journey"
      className="relative isolate w-full overflow-hidden bg-gradient-to-br from-[#09091F] via-[#17134F] to-[#30218A] px-2 py-16 text-white md:px-4 md:py-24 lg:py-28"
    >
      {/* Atmosphere: soft glows, notebook rules, margin line and a ruler */}
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[450px] w-[450px] rounded-full bg-violet-500/20 blur-[140px]" />

      {/* Notebook rules */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={notebookLines}
      />
      {/* Margin line, just left of the content column */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -z-10 w-px bg-gradient-to-b from-violet-300/30 via-violet-300/15 to-transparent"
        style={{ left: "max(0.25rem, calc(50% - 40rem - 1rem))" }}
      />
      {/* Ruler ticks along the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-4"
        style={rulerTicks}
      />

      {/* Same container as the hero */}
      <div className="mx-auto max-w-7xl md:px-6 lg:px-0">
        {/* Eyebrow: same style as the hero badge */}
        <div className="j-eyebrow mb-8 flex items-center justify-center gap-3 motion-safe:invisible md:justify-start">
          <span className="hidden h-px w-7 shrink-0 bg-indigo-300 md:inline-block" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-300">
            The Client Journey
          </p>
        </div>

        {/* Heading: same scale, weight, tracking and leading as the hero h2 */}
        <h2 className="mb-14 max-w-5xl text-center text-5xl font-black leading-[48px] tracking-[-5px] text-white md:mb-20 md:text-start md:text-6xl md:leading-[68px] xl:text-7xl xl:leading-[80px]">
          <span className="block overflow-hidden pb-2">
            <span className="j-line block motion-safe:invisible">
              Every client decides in three moments.
            </span>
          </span>
          <span className="block overflow-hidden pb-3">
            <span className="j-line block bg-gradient-to-r from-indigo-300 to-indigo-500 bg-clip-text pr-2 italic text-transparent motion-safe:invisible">
              Win each one, and the site visit follows.
            </span>
          </span>
        </h2>

        {/* Columns: a step marker with a line that links to the next step, then the card */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <div key={step.moment}>
              <div className="mb-5 flex items-center gap-3">
                <div className="j-node flex items-center gap-3 motion-safe:invisible">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-base font-bold text-white">
                    {step.number}
                  </span>
                  <span className="text-lg font-bold text-gray-200">
                    {step.moment}
                  </span>
                </div>
                <span
                  className={`j-draw h-px flex-1 bg-gradient-to-r from-indigo-400/70 to-indigo-400/10 motion-safe:invisible ${
                    i < steps.length - 1 ? "md:-mr-6" : ""
                  }`}
                />
              </div>

              {/* Outer element: GSAP only. Inner element: CSS hover only. */}
              <article className="j-card h-[calc(100%-3.75rem)] motion-safe:invisible">
                <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-start transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-indigo-300/30 hover:bg-white/[0.07] md:p-6">
                  <div
                    aria-hidden="true"
                    className="h-60 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0a2b]/70 p-4"
                  >
                    <step.Scene />
                  </div>

                  <h3 className="mt-7 text-2xl font-black leading-tight tracking-[-1.5px] text-white md:text-[1.7rem]">
                    {step.title}
                  </h3>

                  <p className="mt-3 flex-1 text-base leading-7 text-gray-400">
                    {step.description}
                  </p>

                  <div className="mt-7 border-t border-white/10 pt-5">
                    <p className="mb-3 text-xs font-semibold text-indigo-300">
                      How we help
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {step.help.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-gray-300"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Closing line + same CTA as the hero */}
        <div className="mt-14 flex flex-col items-center gap-6 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          <p className="text-center text-lg text-gray-400 md:text-start">
            From the first search to the first site visit.
          </p>
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

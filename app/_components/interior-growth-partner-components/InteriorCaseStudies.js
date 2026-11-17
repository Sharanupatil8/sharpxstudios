"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowUpRight, HiStar } from "react-icons/hi2";

/* Case studies on the dark "notebook + ruler" background.
   Page rhythm: light sections around it, this one dark.

   ⚠ DUMMY results and quotes below. Replace with real client numbers before
   going live (or delete `results` / `quote`). Never publish invented numbers.
   While they are dummy, SHOW_SAMPLE_NOTE prints a small "sample figures" line.
   Set it to false once the numbers are real. */

const SHOW_SAMPLE_NOTE = true;

const WA = "918050923077";
const wa = (t) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

const cases = [
  {
    name: "G Cube Studios",
    kind: "Interior Design Studio",
    img: "/assets/gcubestudios.png",
    url: "https://gcubestudio.com/",
    problem:
      "A premium studio whose website didn't reflect the quality of its interiors, with no clear path from portfolio to enquiry.",
    built:
      "A sleek, modern portfolio site with elegant animations, project showcases and lead capture built into the browsing flow.",
    results: [
      { v: "+142%", l: "more enquiries in 90 days" },
      { v: "1.4s", l: "mobile load time" },
      { v: "38", l: "qualified leads in 90 days" },
    ],
    quote:
      "Our website finally looks like the homes we design. Clients now mention it on the very first call.",
  },
  {
    name: "G Cube Infra",
    kind: "Architecture & Construction",
    img: "/assets/gcubeinfra.png",
    url: "https://gcubeinfra.com/",
    problem:
      "An architecture and construction firm that needed to look as established online as it is on site, to attract larger projects.",
    built:
      "A sophisticated, modern site with tasteful animation, a structured portfolio and a clear route for prospective clients to get in touch.",
    results: [
      { v: "+96%", l: "organic traffic growth" },
      { v: "22", l: "project enquiries / month" },
      { v: "97", l: "Lighthouse performance" },
    ],
    quote:
      "The new site gave us the credibility to pitch larger projects. Enquiries are now far better quality.",
  },
];

/* "+142%" -> { prefix: "+", to: 142, dec: 0, suffix: "%" } so numbers can count up */
const parse = (v) => {
  const m = /^([^\d]*)(\d+(?:\.\d+)?)(.*)$/.exec(v);
  if (!m) return null;
  return {
    prefix: m[1],
    to: Number(m[2]),
    dec: (m[2].split(".")[1] || "").length,
    suffix: m[3],
  };
};
const fmt = (v, el) =>
  `${el.dataset.prefix || ""}${Number(v).toFixed(Number(el.dataset.dec || 0))}${el.dataset.suffix || ""}`;

export default function InteriorCaseStudies() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = sectionRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    // Everything starts hidden in CSS (motion-safe:invisible), so nothing flashes
    // before gsap runs. Reduced-motion visitors simply see the final state.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);

      /* header */
      const head = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });
      head
        .fromTo(
          q(".c-eyebrow"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 },
        )
        .fromTo(
          q(".c-line"),
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.14 },
          "-=0.3",
        )
        .fromTo(
          q(".c-sub"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          "-=0.6",
        );

      ScrollTrigger.create({
        trigger: q(".c-header")[0],
        start: "top 85%",
        onEnter: () => head.restart(),
        onEnterBack: () => head.restart(),
        onLeave: () => head.pause(0),
        onLeaveBack: () => head.pause(0),
      });

      /* each case plays when it scrolls in, and again when you come back */
      const cleanups = [];
      gsap.utils.toArray(q("[data-case]")).forEach((card) => {
        const cq = gsap.utils.selector(card);
        const counts = cq("[data-count]");
        const zeroCounts = () =>
          counts.forEach((el) => {
            el.textContent = fmt(0, el);
          });
        zeroCounts();

        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });
        tl.fromTo(
          card,
          { y: 50, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9 },
        )
          .fromTo(
            cq(".c-shot"),
            { scale: 1.1 },
            { scale: 1, duration: 1.8, ease: "power2.out" },
            0.1,
          )
          .fromTo(
            cq(".c-item"),
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 },
            0.3,
          )
          .fromTo(
            cq(".c-stat"),
            { y: 20, autoAlpha: 0, scale: 0.95 },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.12,
              ease: "back.out(1.4)",
            },
            0.7,
          );
        counts.forEach((el) => {
          const obj = { v: 0 };
          tl.to(
            obj,
            {
              v: Number(el.dataset.to),
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = fmt(obj.v, el);
              },
            },
            0.8,
          );
        });

        const reset = () => {
          tl.pause(0);
          zeroCounts();
        };
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => tl.restart(),
          onEnterBack: () => tl.restart(),
          onLeave: reset,
          onLeaveBack: reset,
        });

        // on cleanup, put the real numbers back
        cleanups.push(() =>
          counts.forEach((el) => {
            el.textContent = el.dataset.final;
          }),
        );
      });

      return () => cleanups.forEach((fn) => fn());
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative isolate w-full overflow-hidden bg-gradient-to-br from-[#09091F] via-[#17134F] to-[#30218A] px-2 py-16 text-white md:px-4 md:py-24 lg:py-28"
    >
      {/* Atmosphere: soft glows, notebook rules, margin line and a ruler */}
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[450px] w-[450px] rounded-full bg-violet-500/20 blur-[140px]" />

      {/* Notebook rules: a line every 48px, fading out downwards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[image:repeating-linear-gradient(to_bottom,transparent_0,transparent_47px,rgba(165,180,252,0.11)_47px,rgba(165,180,252,0.11)_48px)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"
      />
      {/* Margin line, just left of the content column */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[max(0.25rem,calc(50%_-_40rem_-_1rem))] -z-10 w-px bg-gradient-to-b from-violet-300/30 via-violet-300/15 to-transparent"
      />
      {/* Ruler along the top edge: small tick every 8px, tall tick every 80px */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-4 bg-[image:repeating-linear-gradient(to_right,rgba(199,210,254,0.5)_0,rgba(199,210,254,0.5)_1px,transparent_1px,transparent_80px),repeating-linear-gradient(to_right,rgba(199,210,254,0.28)_0,rgba(199,210,254,0.28)_1px,transparent_1px,transparent_8px)] bg-no-repeat [background-size:100%_16px,100%_8px] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]"
      />

      <div className="mx-auto max-w-7xl md:px-6 lg:px-0">
        <div className="c-header">
          <div className="c-eyebrow mb-8 flex items-center justify-center gap-3 motion-safe:invisible md:justify-start">
            <span className="hidden h-px w-7 shrink-0 bg-indigo-300 md:inline-block" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-300">
              Case studies
            </p>
          </div>

          <h2 className="max-w-5xl text-center text-5xl font-black leading-[48px] tracking-tighter text-white md:text-start md:text-6xl md:leading-[68px] xl:text-7xl xl:leading-[80px]">
            <span className="block overflow-hidden pb-2">
              <span className="c-line block motion-safe:invisible">
                Built for studios
              </span>
            </span>
            <span className="block overflow-hidden pb-3">
              <span className="c-line block bg-gradient-to-r from-indigo-300 to-indigo-500 bg-clip-text pr-2 italic text-transparent motion-safe:invisible">
                like yours.
              </span>
            </span>
          </h2>

          <p className="c-sub mb-14 mt-6 max-w-2xl text-center text-lg text-gray-400 motion-safe:invisible md:mb-16 md:text-start">
            Real projects for an interior design studio and an architecture
            &amp; construction firm.
          </p>
        </div>

        <div className="grid gap-10">
          {cases.map((c, i) => (
            <article key={c.name} data-case className="motion-safe:invisible">
              {/* Outer element: gsap only. Inner element: CSS hover only. */}
              <div className="group grid items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-4 transition-[transform,border-color,background-color] duration-300 hover:border-indigo-300/30 hover:bg-white/[0.07] md:p-8 lg:grid-cols-2 lg:gap-12">
                {/* Browser frame with the live site */}
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${c.name} website`}
                  className={`relative block overflow-hidden rounded-2xl border border-white/10 bg-[#0b0a2b]/70 shadow-2xl shadow-indigo-500/20 ${
                    i % 2 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    <span className="ml-3 truncate rounded bg-white/10 px-3 py-0.5 text-[11px] text-indigo-100/70">
                      {c.url.replace("https://", "").replace(/\/$/, "")}
                    </span>
                  </div>
                  <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-[#17134F] to-[#30218A]">
                    <div className="c-shot absolute inset-0">
                      <Image
                        src={c.img}
                        alt={`${c.name} website homepage`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-top transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </a>

                <div>
                  <p className="c-item text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-300 motion-safe:invisible">
                    {c.kind}
                  </p>
                  <h3 className="c-item mb-5 mt-2 text-4xl font-black tracking-tight text-white motion-safe:invisible md:text-5xl">
                    {c.name}
                  </h3>
                  <p className="c-item mb-3 text-gray-400 motion-safe:invisible">
                    <b className="text-white">The challenge: </b>
                    {c.problem}
                  </p>
                  <p className="c-item mb-6 text-gray-400 motion-safe:invisible">
                    <b className="text-white">What we built: </b>
                    {c.built}
                  </p>

                  {c.results && (
                    <div className="mb-6 grid grid-cols-3 gap-3">
                      {c.results.map((r) => {
                        const p = parse(r.v);
                        return (
                          <div
                            key={r.l}
                            className="c-stat rounded-xl border border-white/10 bg-white/[0.05] p-3 motion-safe:invisible"
                          >
                            <p className="bg-gradient-to-r from-indigo-300 to-indigo-500 bg-clip-text text-2xl font-black text-transparent md:text-3xl">
                              {p ? (
                                <span
                                  data-count
                                  data-to={p.to}
                                  data-dec={p.dec}
                                  data-prefix={p.prefix}
                                  data-suffix={p.suffix}
                                  data-final={r.v}
                                >
                                  {r.v}
                                </span>
                              ) : (
                                r.v
                              )}
                            </p>
                            <p className="mt-1 text-xs leading-snug text-gray-400">
                              {r.l}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {c.quote && (
                    <blockquote className="c-item mb-6 border-l-4 border-indigo-400 pl-4 motion-safe:invisible">
                      <div className="mb-1 flex text-amber-300">
                        {[...Array(5)].map((_, k) => (
                          <HiStar key={k} />
                        ))}
                      </div>
                      <p className="italic text-gray-200">“{c.quote}”</p>
                    </blockquote>
                  )}

                  <div className="c-item flex flex-wrap gap-3 motion-safe:invisible">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-md border border-white/25 px-4 py-3 text-lg font-bold text-white transition hover:border-indigo-300 hover:text-indigo-200"
                    >
                      Visit live site <HiArrowUpRight />
                    </a>
                    <a
                      href={wa(
                        `Hi! I saw the ${c.name} project and want something similar for my studio.`,
                      )}
                      className="inline-flex items-center justify-center gap-1.5 rounded-md border border-indigo-500 bg-indigo-600 px-4 py-3 text-lg font-bold text-white transition hover:bg-indigo-700"
                    >
                      I want this <HiArrowUpRight />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {SHOW_SAMPLE_NOTE && (
          <p className="mt-8 text-center text-xs text-gray-500">
            Figures and quotes shown are sample data.
          </p>
        )}
      </div>
    </section>
  );
}

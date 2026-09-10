"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { gsap } from "gsap";

function Hero() {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const avatarsRef = useRef(null);

  useEffect(() => {
    // Load dotlottie player on the client
    import("@dotlottie/player-component");
  }, []);

  useEffect(() => {
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
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-full w-full overflow-hidden px-2 md:px-4"
    >
      {/* Main Hero Content */}
      <div className="relative z-40 mx-auto h-full max-w-7xl pb-16 md:px-6 lg:px-0">
        <div className="flex h-full w-full flex-col justify-center text-center md:text-start lg:me-auto lg:w-4/5">
          {/* SEO / Hero Badge */}
          <div
            ref={badgeRef}
            className="mb-8 flex items-center justify-center gap-3 md:mt-0 md:justify-start"
          >
            <span className="hidden h-px w-7 shrink-0 bg-indigo-600 md:inline-block" />

            <h1 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-600">
              Web Development & AI Automation Agency in RR Nagar, Bangalore
            </h1>
          </div>

          {/* Main Heading */}
          <h2
            ref={headingRef}
            className="text-center text-5xl font-black leading-tight text-gray-900 dark:text-white md:text-start md:text-6xl md:leading-[92px] lg:text-8xl"
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
            <span className="inline-block bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent dark:from-indigo-300 dark:to-indigo-500">
              businesses
            </span>{" "}
            grow in
            <br /> the digital world
            <span className="bg-gradient-to-r from-indigo-300 to-indigo-600 bg-clip-text text-transparent">
              .
            </span>
          </h2>

          {/* Description */}
          <p
            ref={descRef}
            className="mt-6 mb-4 text-center text-lg text-gray-700 dark:text-gray-400 md:mt-8 md:text-start"
          >
            Transform your online presence with our expert web design &
            development and digital marketing solutions.
            <span className="hidden md:block">
              We help businesses like yours reach more customers, drive real
              engagement, and achieve measurable growth.
            </span>
          </p>

          {/* CTA + Clients */}
          <div
            ref={buttonRef}
            className="mt-10 flex flex-col items-center gap-x-8 gap-y-6 md:mt-10 md:flex-row md:gap-y-0"
          >
            {/* CTA */}
            <a
              href="#contact"
              className="block rounded-md border border-indigo-700 bg-indigo-700 px-4 py-3 text-lg font-bold text-white transition hover:bg-indigo-800"
            >
              Let&apos;s Get Started{" "}
              <HiArrowUpRight className="inline-block text-lg" />
            </a>

            {/* Client Avatars */}
            <div ref={avatarsRef} className="flex self-center">
              <div>
                <Image
                  src="/assets/avatars/image-1.jpg"
                  width={40}
                  height={40}
                  alt="SharpXstudios client"
                  className="h-12 w-12 rounded-full border-4 border-gray-200"
                />
              </div>

              <div className="-ms-4">
                <Image
                  src="/assets/avatars/image-2.jpg"
                  width={40}
                  height={40}
                  alt="SharpXstudios client"
                  className="h-12 w-12 rounded-full border-4 border-gray-200"
                />
              </div>

              <div className="-ms-4">
                <Image
                  src="/assets/avatars/image-3.jpg"
                  width={40}
                  height={40}
                  alt="SharpXstudios client"
                  className="h-12 w-12 rounded-full border-4 border-gray-200"
                />
              </div>

              <div className="-ms-4">
                <Image
                  src="/assets/avatars/image-4.jpg"
                  width={40}
                  height={40}
                  alt="SharpXstudios client"
                  className="h-12 w-12 rounded-full border-4 border-gray-200"
                />
              </div>

              <div className="-ms-4">
                <Image
                  src="/assets/avatars/image-5.jpg"
                  width={40}
                  height={40}
                  alt="SharpXstudios client"
                  className="h-12 w-12 rounded-full border-4 border-gray-200"
                />
              </div>

              <div className="ms-3 flex flex-col justify-start">
                <p className="mb-0 pb-0 text-xl text-gray-700 dark:text-gray-300">
                  20+
                </p>

                <p className="mt-0 pt-0 text-sm text-gray-600 dark:text-gray-400">
                  Happy Clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — LOTTIE + GRADIENT */}
      <div className="pointer-events-none absolute right-[-180px] top-1/2 z-10 hidden -translate-y-1/2 md:block lg:right-[-100px] xl:right-[-10px]">
        {/* Background Glow */}
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-700 opacity-60 blur-3xl" />

        {/* Lottie Animation */}
        <div className="relative z-10 w-[360px] lg:w-[450px] xl:w-[500px]">
          <dotlottie-player
            src="/assets/techny-team-calendar-bar-chart-and-finance-icons-on-puzzles-task-management-and-project-scheduling.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;

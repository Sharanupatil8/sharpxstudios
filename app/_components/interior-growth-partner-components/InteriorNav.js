"use client";

import Link from "next/link";
import Image from "next/image";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

/* Same floating pill navbar as your homepage, with links for this landing page.
   "Contact" becomes a "Free growth audit" CTA that jumps to the form. */
const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Case studies", href: "#work" },
  { name: "Process", href: "#process" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

function InteriorNavbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(linksRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, navRef);

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
      );
    }
  }, [isMobileMenuOpen]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={`sticky top-5 z-50 mx-auto flex h-[60px] w-[calc(100%-2rem)] max-w-7xl items-center justify-between rounded-full px-6 transition-all duration-500 md:px-10 ${
        scrolled
          ? "border border-gray-200 bg-white/95 shadow-md backdrop-blur-xl"
          : "border border-gray-200/70 bg-white/80 backdrop-blur-md"
      }`}
    >
      {/* Logo */}
      <Link href="/" ref={logoRef} className="block ">
        <Image
          src="/logo.png"
          width="160"
          height="80"
          alt="sharpxstudios"
          className="w-30 h-auto "
        />
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden items-center gap-x-8 lg:flex">
        {navLinks.map((item, i) => (
          <li key={item.name} ref={(el) => (linksRef.current[i] = el)}>
            <Link
              href={item.href}
              className="text-md group relative font-medium text-gray-500 transition hover:text-gray-900"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}

        <li ref={(el) => (linksRef.current[navLinks.length] = el)}>
          <Link
            href="#contact"
            className="rounded-full bg-indigo-600 px-5 py-2 text-sm text-white transition hover:bg-indigo-700"
          >
            Free growth audit
          </Link>
        </li>
      </ul>

      {/* Mobile Button */}
      <button
        className="text-gray-600 lg:hidden"
        onClick={() => setMobileMenuOpen((p) => !p)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <HiXMark className="h-6 w-6" />
        ) : (
          <HiBars3 className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute left-0 right-0 top-[70px] rounded-2xl border border-gray-200 bg-white py-8 shadow-xl"
        >
          <ul className="flex flex-col items-center gap-6">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-800 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <Link
              href="#contact"
              className="rounded-full bg-indigo-600 px-6 py-2 text-sm text-white hover:bg-indigo-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Free growth audit
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default InteriorNavbar;

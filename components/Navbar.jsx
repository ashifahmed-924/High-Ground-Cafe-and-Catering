"use client";

import { useEffect, useRef, useState } from "react";
import BrandMark from "@/components/BrandMark";
import MobileMenu from "@/components/MobileMenu";
import { business } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const links = [
  { href: "#breakfast", label: "Breakfast" },
  { href: "#lunch", label: "Lunch" },
  { href: "#coffee", label: "Coffee" },
  { href: "#catering", label: "Catering" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.to(navRef.current, {
        height: scrolled ? 68 : 86,
        duration: 0.35,
        ease: "power2.out",
      });
    }, navRef);
    return () => ctx.revert();
  }, [scrolled, reduced]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 section-pad transition-[background,backdrop-filter,border-color,color] duration-300 ${
          scrolled
            ? "border-b border-mist bg-milk/90 text-graphite backdrop-blur-md nav-scrolled"
            : "border-b border-transparent bg-transparent text-petrol"
        }`}
        style={{ height: reduced ? (scrolled ? 68 : 86) : undefined }}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-4">
          <a href="#top" className="shrink-0" aria-label="High Ground Cafe home">
            <BrandMark />
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="utility-label text-graphite/80 transition-colors hover:text-coral"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={business.phoneHref}
              className="utility-label text-graphite transition-colors hover:text-coral"
            >
              Call
            </a>
            <a href={business.enquiryMailto} className="btn-radiant">
              Catering Enquiry
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-petrol/20 text-petrol md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="font-heading text-xs tracking-[0.2em] uppercase">
              {menuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

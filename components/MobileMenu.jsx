"use client";

import { useEffect, useRef } from "react";
import { business } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const links = [
  { href: "#breakfast", label: "Breakfast" },
  { href: "#lunch", label: "Lunch" },
  { href: "#coffee", label: "Coffee" },
  { href: "#catering", label: "Catering" },
  { href: "#visit", label: "Visit" },
];

export default function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open || reduced) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current?.querySelectorAll("[data-mobile-link]"),
        { x: (i) => (i % 2 === 0 ? -40 : 40), opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" }
      );
    }, panelRef);
    return () => ctx.revert();
  }, [open, reduced]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[60] flex flex-col bg-petrol px-6 pb-8 pt-24 text-oat md:hidden"
    >
      <nav className="flex flex-1 flex-col justify-center gap-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            data-mobile-link
            onClick={onClose}
            className="font-display text-5xl leading-none tracking-tight text-oat sm:text-6xl"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto space-y-4 border-t border-mist/30 pt-6">
        <a
          href={business.phoneHref}
          className="font-heading text-2xl tracking-wide text-oat"
        >
          {business.phone}
        </a>
        <a href={business.enquiryMailto} className="btn-radiant w-full" onClick={onClose}>
          Catering Enquiry
          <span className="btn-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </div>
  );
}

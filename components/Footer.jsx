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

export default function Footer() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelector("[data-footer-line]"),
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 0.8,
          scrollTrigger: { trigger: root, start: "top 90%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer ref={rootRef} className="bg-milk py-16 text-petrol">
      <div className="section-pad mx-auto max-w-[1440px]">
        <div data-footer-line className="mb-8 h-px origin-left bg-coral" />
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-5xl leading-none md:text-6xl">
              High
              <br />
              Ground
            </p>
            <p className="utility-label mt-3 text-stone">Cafe + Catering</p>
          </div>

          <div>
            <p className="utility-label text-stone">Contact</p>
            <p className="mt-3 text-sm leading-relaxed">
              {business.address.display}
            </p>
            <a href={business.phoneHref} className="mt-3 block hover:text-coral">
              {business.phone}
            </a>
            <a
              href={business.emailHref}
              className="mt-2 block break-all hover:text-coral"
            >
              {business.email}
            </a>
          </div>

          <div>
            <p className="utility-label text-stone">Explore</p>
            <nav className="mt-3 flex flex-col gap-2" aria-label="Footer">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-coral">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <p className="mt-12 text-sm text-stone">
          © 2026 High Ground Cafe and Catering
        </p>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { business } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function FinalCateringCTA() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelector("[data-feed]"),
        { x: -45, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
      gsap.fromTo(
        root.querySelector("[data-team]"),
        { x: 45, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
      gsap.fromTo(
        root.querySelector("[data-fuss]"),
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.6,
          scrollTrigger: { trigger: root, start: "top 62%" },
        }
      );
      gsap.fromTo(
        root.querySelector("[data-cta-image]"),
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 60%" },
        }
      );
      gsap.fromTo(
        root.querySelectorAll("[data-cta-btn]"),
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.4,
          scrollTrigger: { trigger: root, start: "top 55%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-ink py-20 text-oat md:py-28">
      <div className="section-pad relative mx-auto max-w-[1440px]">
        <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">
          <span data-feed className="block">
            Feed
          </span>
          <span data-feed className="block">
            the
          </span>
          <span data-team className="block text-right">
            team.
          </span>
        </h2>
        <p
          data-fuss
          className="mt-8 max-w-xl font-heading text-2xl uppercase tracking-[0.08em] text-coral md:text-3xl"
        >
          Without the fuss.
        </p>
        <p className="mt-4 max-w-lg text-mist">
          Breakfast, lunch and workplace catering from Dandenong South.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a data-cta-btn href={business.enquiryMailto} className="btn-radiant" data-cursor="PLAN">
            Catering enquiry
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a data-cta-btn href={business.phoneHref} className="btn-secondary btn-secondary-light">
            Call us
          </a>
          <a data-cta-btn href={business.emailHref} className="btn-secondary btn-secondary-light">
            Email
          </a>
        </div>
      </div>

      <div className="relative mt-14 h-48 w-full overflow-hidden md:h-64">
        <div data-cta-image className="absolute inset-0">
          <Image
            src="/images/high-ground/catering-package.jpg"
            alt="Overhead catering spread"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-6 section-pad">
          {["Morning Tea", "Lunch", "Workplace"].map((label) => (
            <span key={label} className="utility-label text-oat">
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

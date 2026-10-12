"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import TextMask from "@/components/motion/TextMask";
import CafePattern from "@/components/CafePattern";
import { business } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const strips = [
  {
    src: "/images/high-ground/hero-coffee.jpg",
    alt: "Close-up coffee pour at High Ground Cafe",
    speed: -5,
  },
  {
    src: "/images/high-ground/hero-breakfast.jpg",
    alt: "Breakfast roll and toastie",
    speed: -9,
  },
  {
    src: "/images/high-ground/hero-catering.jpg",
    alt: "Catering sandwich tray",
    speed: -3,
  },
];

export default function HeroWorkday() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (!reduced) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          root.querySelector(".hero-am"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4 }
        )
          .fromTo(
            root.querySelectorAll(".time-char .mask-inner"),
            { yPercent: 110 },
            { yPercent: 0, duration: 0.75, stagger: 0.05 },
            "-=0.15"
          )
          .fromTo(
            root.querySelectorAll(".hero-strip-inner"),
            { scaleY: 0 },
            { scaleY: 1, duration: 0.7, stagger: 0.12, transformOrigin: "bottom" },
            "-=0.45"
          )
          .fromTo(
            root.querySelector(".hero-time"),
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.55 },
            "-=0.35"
          )
          .fromTo(
            root.querySelector(".hero-cta-mask"),
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.5 },
            "-=0.25"
          )
          .fromTo(
            root.querySelector(".hero-address"),
            { opacity: 0 },
            { opacity: 1, duration: 0.4 },
            "-=0.25"
          );

        root.querySelectorAll("[data-strip]").forEach((el) => {
          gsap.to(el, {
            yPercent: Number(el.dataset.speed || -5),
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        gsap.to(root.querySelector(".hero-headline"), {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === root) t.kill();
      });
    };
  }, [reduced]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative overflow-hidden bg-oat pt-[calc(var(--nav-h)+1.5rem)] pb-10 md:pb-16"
    >
      <CafePattern variant="cup-rings" opacity={0.035} className="text-petrol" />

      <div className="section-pad relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[55%_45%] lg:gap-8">
        <div className="relative z-10">
          <p className="hero-am utility-label mb-5 text-coral">
            Open from 5:30 AM · Dandenong South
          </p>

          <h1 className="hero-headline">
            <TextMask
              text="High Ground"
              className="font-display text-[clamp(3.75rem,12vw,8.5rem)] leading-[0.9] tracking-[-0.02em] text-petrol time-char"
            />
          </h1>

          <p className="hero-time mt-5 max-w-md font-heading text-xl font-medium leading-snug text-graphite md:text-2xl lg:text-3xl">
            Cafe &amp; catering built for early starts, real breakfasts, and workplace tables.
          </p>

          <div className="hero-cta-mask mt-8 flex flex-wrap gap-3">
            <a href="#menu" className="btn-radiant" data-cursor="VIEW">
              View Today&apos;s Menu
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href="#catering" className="btn-secondary" data-cursor="PLAN">
              Catering
            </a>
          </div>

          <p className="hero-address mt-10 utility-label text-stone">
            {business.address.short}
            <br />
            {business.address.suburb}
          </p>
        </div>

        <div className="relative hidden h-[min(72vh,640px)] lg:block">
          <div className="absolute inset-y-4 left-0 right-0 flex gap-3">
            {strips.map((strip, i) => (
              <div
                key={strip.src}
                data-strip
                data-speed={strip.speed}
                data-cursor="VIEW"
                className="relative flex-1 overflow-hidden"
                style={{ transform: `translateY(${i * 18}px)` }}
              >
                <div className="hero-strip-inner relative h-full w-full origin-bottom">
                  <Image
                    src={strip.src}
                    alt={strip.alt}
                    fill
                    priority
                    sizes="18vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          <div className="relative aspect-[4/5] overflow-hidden" data-cursor="VIEW">
            <Image
              src="/images/high-ground/hero-coffee.jpg"
              alt="Coffee pour"
              fill
              priority
              sizes="90vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-rows-2 gap-3">
            <div className="relative min-h-[140px] overflow-hidden">
              <Image
                src="/images/high-ground/hero-breakfast.jpg"
                alt="Breakfast"
                fill
                sizes="45vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[140px] overflow-hidden">
              <Image
                src="/images/high-ground/hero-catering.jpg"
                alt="Catering"
                fill
                sizes="45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { feedbackThemes } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const rotations = [-1.5, 1, -1, 1.2, -0.8];

export default function FeedbackWall() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll("[data-note]").forEach((note, i) => {
        gsap.fromTo(
          note,
          { rotate: rotations[i] * 3, opacity: 0, y: 16 },
          {
            rotate: rotations[i],
            opacity: 1,
            y: 0,
            duration: 0.55,
            delay: i * 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: root, start: "top 75%" },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} className="bg-mist py-20 md:py-28">
      <div className="section-pad mx-auto max-w-[1440px]">
        <p className="utility-label text-petrol">Public customer feedback</p>
        <h2 className="mt-3 font-display text-4xl text-petrol md:text-5xl">The break room wall</h2>
        <p className="mt-3 max-w-xl text-graphite/80">
          Themes from public customer feedback — good coffee, variety, friendly service, and a
          favourite work-break stop.
        </p>

        <div className="mt-12 flex flex-wrap gap-5 md:gap-8">
          {feedbackThemes.map((note, i) => (
            <p
              key={note.id}
              data-note
              className="font-display text-3xl text-petrol md:text-5xl"
              style={{ transform: `rotate(${rotations[i]}deg)` }}
            >
              {note.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

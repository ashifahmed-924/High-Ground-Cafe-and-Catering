"use client";

import { useEffect, useState } from "react";
import BounceCards from "@/components/BounceCards";
import { focacciaWraps, formatPrice } from "@/data/highGround";

const images = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=720&h=720&fit=crop", // burger
  "https://images.unsplash.com/photo-1562059390-a761a084768e?w=720&h=720&fit=crop", // wraps
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=720&h=720&fit=crop", // lunch plate
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=720&h=720&fit=crop", // food platter
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=720&h=720&fit=crop", // pizza
  "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=720&h=720&fit=crop", // chicken burger
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=720&h=720&fit=crop", // fries burger
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=720&h=720&fit=crop", // restaurant plates
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=720&h=720&fit=crop", // catering spread
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=720&h=720&fit=crop", // bowl meal
];

export default function FocacciaStack() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section className="relative overflow-x-clip bg-mist py-14 md:py-20">
      <div className="section-pad relative mx-auto max-w-[1440px]">
        <p className="utility-label text-petrol">
          Pre-made · {formatPrice(focacciaWraps.price)}
        </p>
        <h2 className="mt-2 font-display text-4xl text-petrol md:text-6xl">
          Stacked
          <br />
          for lunch.
        </h2>

        <div className="mt-8 flex justify-center md:mt-12">
          <BounceCards
            images={images}
            containerWidth={compact ? 420 : 1180}
            containerHeight={compact ? 320 : 440}
            cardSize={compact ? 190 : 300}
            spread={compact ? 68 : 112}
            rotation={7}
            arc={0}
            pushDistance={compact ? 100 : 150}
            hoverScale={1.06}
            bounciness={0.6}
            animationDelay={0.35}
            animationStagger={0.04}
            borderWidth={4}
            borderColor="#ffffff"
            radius={24}
            shadow
            enableHover
          />
        </div>
      </div>
    </section>
  );
}

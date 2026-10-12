import { useEffect } from "react";
import Lenis from "lenis";
import { getGsap } from "../animations/gsapSetup";

export default function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const { gsap, ScrollTrigger } = getGsap();
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [enabled]);
}

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

let registered = false;

export function getGsap() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger, Flip);
    registered = true;
  }
  return { gsap, ScrollTrigger, Flip };
}

export { gsap, ScrollTrigger, Flip };

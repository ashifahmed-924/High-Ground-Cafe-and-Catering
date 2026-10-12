import { getGsap } from "./gsapSetup";

export function animateImageReveal(scope, { reduced = false } = {}) {
  const { gsap } = getGsap();
  const frames = scope.querySelectorAll("[data-reveal-image]");

  if (reduced) {
    frames.forEach((frame) => {
      const img = frame.querySelector("img");
      if (img) gsap.set(img, { scale: 1 });
    });
    return;
  }

  frames.forEach((frame) => {
    const img = frame.querySelector("img");
    if (!img) return;

    gsap.fromTo(
      img,
      { scale: 1.14, yPercent: 8 },
      {
        scale: 1,
        yPercent: 0,
        duration: 1.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: frame,
          start: "top 85%",
          once: true,
        },
      }
    );
  });
}

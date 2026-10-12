import { getGsap } from "./gsapSetup";

export function animateParallax(scope, { reduced = false } = {}) {
  if (reduced) return;
  const { gsap } = getGsap();
  const nodes = scope.querySelectorAll("[data-parallax]");

  nodes.forEach((node) => {
    const speed = Number(node.dataset.parallax || 20);
    gsap.to(node, {
      yPercent: speed,
      ease: "none",
      scrollTrigger: {
        trigger: node,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

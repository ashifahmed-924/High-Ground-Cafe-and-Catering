import { getGsap } from "./gsapSetup";

export function splitLines(element) {
  if (!element || element.dataset.split === "true") return;
  const text = element.textContent.trim();
  element.classList.add("reveal-line");
  element.innerHTML = `<span>${text}</span>`;
  element.dataset.split = "true";
}

export function animateTextReveal(scope, { reduced = false } = {}) {
  const { gsap } = getGsap();
  const lines = scope.querySelectorAll("[data-reveal-text]");

  lines.forEach((el) => splitLines(el));

  if (reduced) {
    lines.forEach((el) => {
      const span = el.querySelector("span");
      if (span) gsap.set(span, { y: 0 });
    });
    return;
  }

  gsap.fromTo(
    scope.querySelectorAll("[data-reveal-text] span"),
    { y: "110%" },
    {
      y: "0%",
      duration: 1.05,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: scope,
        start: "top 78%",
        once: true,
      },
    }
  );
}

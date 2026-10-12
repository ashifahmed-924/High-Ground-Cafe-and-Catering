import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Header from "./Header";
import AnimatedButton from "./AnimatedButton";
import { business } from "../data/business";
import { images } from "../data/images";
import { getGsap } from "../animations/gsapSetup";
import useReducedMotion from "../hooks/useReducedMotion";
import styles from "./HeroSection.module.css";

const HEADLINES = [
  { text: "Good food.", accent: false },
  { text: "Great coffee.", accent: false },
  { text: "Higher", accent: true },
  { text: "standards.", accent: true },
];

function splitChars(text) {
  return text.split("").map((char, i) => (
    <span key={`${text}-${i}`} className={styles.char} data-char>
      <span className={styles.charInner}>{char === " " ? "\u00A0" : char}</span>
    </span>
  ));
}

export default function HeroSection() {
  const [navOpen, setNavOpen] = useState(false);
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [
            `.${styles.bg}`,
            `.${styles.shade}`,
            `.${styles.charInner}`,
            `.${styles.layerFood}`,
            `.${styles.badge}`,
            `.${styles.support}`,
            `.${styles.ctas}`,
            `.${styles.eyebrow}`,
            `.${styles.sideLabel}`,
            `.${styles.scroll}`,
            `.${styles.shimmer}`,
          ],
          { clearProps: "all", autoAlpha: 1, y: 0, rotateX: 0 }
        );
        return;
      }

      gsap.set(`.${styles.charInner}`, {
        yPercent: 120,
        rotateX: -75,
        opacity: 0,
        transformOrigin: "50% 100%",
      });
      gsap.set(`.${styles.shimmer}`, { xPercent: -120, autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(`.${styles.bg}`, { scale: 1.12 }, { scale: 1, duration: 1.8 })
        .fromTo(
          `.${styles.shade}`,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.8 },
          0.15
        )
        .fromTo(
          `.${styles.eyebrow}`,
          { autoAlpha: 0, letterSpacing: "0.4em", y: 16 },
          { autoAlpha: 1, letterSpacing: "0.18em", y: 0, duration: 0.85 },
          0.2
        )
        .to(
          `.${styles.charInner}`,
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.85,
            stagger: {
              each: 0.028,
              from: "start",
            },
            ease: "back.out(1.4)",
          },
          0.35
        )
        .fromTo(
          `.${styles.lineWrap}`,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.05,
            stagger: 0.12,
            ease: "power4.inOut",
          },
          0.32
        )
        .fromTo(
          `.${styles.shimmer}`,
          { xPercent: -120, autoAlpha: 0.9 },
          { xPercent: 120, autoAlpha: 0, duration: 1.1, ease: "power2.inOut" },
          1.15
        )
        .fromTo(
          `.${styles.layerFood}`,
          { y: 80, rotate: -6, autoAlpha: 0 },
          { y: 0, rotate: 0, autoAlpha: 1, duration: 1.15 },
          0.45
        )
        .fromTo(
          `.${styles.badge}`,
          { rotate: -40, autoAlpha: 0, scale: 0.85 },
          { rotate: 0, autoAlpha: 1, scale: 1, duration: 1 },
          0.65
        )
        .fromTo(
          `.${styles.support}`,
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          1.05
        )
        .fromTo(
          `.${styles.ctas} > *`,
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.1 },
          1.15
        )
        .fromTo(
          `.${styles.sideLabel}, .${styles.scroll}`,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6 },
          1.3
        );

      // Soft gold pulse on the accent line after entrance
      gsap.fromTo(
        `.${styles.accentWrap}`,
        { filter: "drop-shadow(0 0 0px rgba(232, 188, 110, 0))" },
        {
          filter: "drop-shadow(0 0 18px rgba(232, 188, 110, 0.55))",
          duration: 1.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.8,
        }
      );

      // Subtle floating on headline after settle
      gsap.to(`.${styles.headline}`, {
        y: -6,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      gsap.to(`.${styles.badge}`, {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      gsap.to(`.${styles.layerFood}`, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (pointer: fine)", () => {
        const onMove = (e) => {
          const { innerWidth, innerHeight } = window;
          const x = (e.clientX / innerWidth - 0.5) * 18;
          const y = (e.clientY / innerHeight - 0.5) * 14;
          gsap.to(`.${styles.layerFood}`, {
            x,
            y,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(`.${styles.bg}`, {
            x: x * -0.35,
            y: y * -0.25,
            duration: 1,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(`.${styles.headline}`, {
            x: x * 0.15,
            duration: 0.9,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="top" className={styles.hero} ref={sectionRef}>
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />

      <div className={styles.media} aria-hidden="true">
        <img className={styles.bg} src={images.hero.bg} alt="" />
        <div className={styles.shade} />
        <img className={styles.layerFood} src={images.hero.food} alt="" />
      </div>

      <p className={styles.sideLabel}>Dandenong South · Est. Local</p>

      <div className={`container ${styles.content}`}>
        <p className={styles.eyebrow}>
          Dandenong South · Breakfast · Lunch · Catering
        </p>

        <h1
          className={styles.headline}
          aria-label="Good food. Great coffee. Higher standards."
        >
          {HEADLINES.map((line, index) => (
            <span
              key={`${line.text}-${index}`}
              className={`${styles.lineWrap} ${line.accent ? styles.accentWrap : ""}`}
              aria-hidden="true"
            >
              <span
                className={`${styles.line} ${line.accent ? styles.accent : ""}`}
              >
                {splitChars(line.text)}
              </span>
              {line.accent && index === HEADLINES.length - 1 ? (
                <span className={styles.shimmer} aria-hidden="true" />
              ) : null}
            </span>
          ))}
        </h1>

        <p className={styles.support}>
          Your early coffee, fresh-made favourites and workday catering — all in
          one welcoming local cafe.
        </p>

        <div className={styles.ctas}>
          <AnimatedButton
            href={business.uberEatsUrl}
            variant="gold"
            target="_blank"
            rel="noreferrer"
          >
            Order on Uber Eats
          </AnimatedButton>
          <AnimatedButton href="#menu" variant="ghost">
            Explore our menu
          </AnimatedButton>
        </div>
      </div>

      <div className={styles.badge} aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <defs>
            <path
              id="badgePath"
              d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
            />
          </defs>
          <text>
            <textPath href="#badgePath" startOffset="0%">
              HIGH GROUND · CAFE &amp; CATERING · FRESH DAILY ·
            </textPath>
          </text>
        </svg>
        <span>HG</span>
      </div>

      <a className={styles.scroll} href="#about" aria-label="Scroll to story">
        <span>Scroll</span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}

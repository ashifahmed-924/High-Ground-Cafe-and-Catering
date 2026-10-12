import { useEffect, useRef } from "react";
import { images } from "../data/images";
import { getGsap } from "../animations/gsapSetup";
import useReducedMotion from "../hooks/useReducedMotion";
import styles from "./CoffeeSection.module.css";

const drinks = ["Cappuccino", "Latte", "Flat White", "Mocha", "Iced Coffee", "Iced Latte", "Milkshake"];

export default function CoffeeSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(`.${styles.drink}`, {
        y: 30,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          once: true,
        },
      });
      gsap.to(`.${styles.photo} img`, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="coffee" className={`section ${styles.section}`} ref={ref}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.photo}>
          <img src={images.menu.latte} alt="Latte at High Ground Cafe" />
        </div>
        <div className={styles.copy}>
          <p className="section-label">Coffee</p>
          <h2 className="section-title">Good days start here.</h2>
          <p className="section-copy">
            Hot and iced classics for the workday — ask about milk alternatives and extras in store.
          </p>
          <a className={styles.cta} href="#visit">
            Grab your morning coffee
          </a>
          <ul className={styles.list}>
            {drinks.map((drink) => (
              <li key={drink} className={styles.drink}>
                {drink}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

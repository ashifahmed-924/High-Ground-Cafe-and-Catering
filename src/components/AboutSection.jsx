import { useEffect, useRef } from "react";
import { business } from "../data/business";
import { images } from "../data/images";
import { getGsap } from "../animations/gsapSetup";
import { animateTextReveal } from "../animations/textReveal";
import { animateImageReveal } from "../animations/imageReveal";
import useReducedMotion from "../hooks/useReducedMotion";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      animateTextReveal(ref.current, { reduced });
      animateImageReveal(ref.current, { reduced });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="about" className={`section ${styles.about}`} ref={ref}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="section-label">Welcome to High Ground</p>
          <h2 className="section-title" data-reveal-text>
            Your daily happy place.
          </h2>
          <p className="section-copy">
            {business.description} We serve Dandenong, Keysborough, Lynbrook and
            Lyndhurst with cafe meals and workplace catering.
          </p>
          <ul className={styles.facts}>
            <li>{business.address.display}</li>
            <li>{business.hours.weekdays}</li>
            <li>{business.hours.weekend}</li>
          </ul>
        </div>
        <div className={`${styles.visual} img-reveal`} data-reveal-image>
          <img
            src={images.gallery.welcome}
            alt="High Ground Cafe counter and seating"
          />
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { cateringOffers } from "../data/gallery";
import { business } from "../data/business";
import { getGsap } from "../animations/gsapSetup";
import useReducedMotion from "../hooks/useReducedMotion";
import AnimatedButton from "./AnimatedButton";
import CateringEnquiryModal from "./CateringEnquiryModal";
import styles from "./CateringSection.module.css";

export default function CateringSection() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(`.${styles.offer}`, {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="catering" className={`section ${styles.section}`} ref={ref}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="section-label">Fresh catering for your workplace</p>
            <h2 className="section-title">Good food. Better meetings.</h2>
            <p className="section-copy">
              Morning tea, finger food, cold lunch and fruit boxes across{" "}
              {business.cateringAreas.join(", ")}.
            </p>
          </div>
          <AnimatedButton variant="primary" onClick={() => setOpen(true)}>
            Enquire about catering
          </AnimatedButton>
        </div>

        <div className={styles.grid}>
          {cateringOffers.map((offer) => (
            <article key={offer.id} className={styles.offer}>
              <img src={offer.image} alt={offer.title} />
              <div>
                <h3>{offer.title}</h3>
                <p>{offer.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <CateringEnquiryModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

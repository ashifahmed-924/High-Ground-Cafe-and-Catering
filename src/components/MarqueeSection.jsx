import { marqueeWords } from "../data/navigation";
import styles from "./MarqueeSection.module.css";

export default function MarqueeSection() {
  const loop = [...marqueeWords, ...marqueeWords];

  return (
    <section className={styles.section} aria-label="Highlights">
      <div className={styles.track}>
        {loop.map((word, i) => (
          <span key={`${word}-${i}`} className={styles.word}>
            {word}
            <span aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

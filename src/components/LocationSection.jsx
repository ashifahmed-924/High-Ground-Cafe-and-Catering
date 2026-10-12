import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { business } from "../data/business";
import AnimatedButton from "./AnimatedButton";
import styles from "./LocationSection.module.css";

export default function LocationSection() {
  return (
    <section id="visit" className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="section-label">Visit</p>
          <h2 className="section-title">Find your High Ground.</h2>
          <ul className={styles.list}>
            <li>
              <MapPin size={18} aria-hidden="true" />
              <span>{business.address.display}</span>
            </li>
            <li>
              <Phone size={18} aria-hidden="true" />
              <a href={business.phoneHref}>{business.phone}</a>
            </li>
            <li>
              <Mail size={18} aria-hidden="true" />
              <a href={business.emailHref}>{business.email}</a>
            </li>
            <li>
              <Clock size={18} aria-hidden="true" />
              <span>
                {business.hours.weekdays}
                <br />
                {business.hours.weekend}
              </span>
            </li>
          </ul>
          {business.hoursNeedConfirmation ? (
            <p className={styles.note}>{business.hoursNote}</p>
          ) : null}
          <div className={styles.actions}>
            <AnimatedButton href={business.mapsUrl} variant="primary" target="_blank" rel="noreferrer">
              Open directions
            </AnimatedButton>
            <AnimatedButton href={business.phoneHref} variant="ink">
              Call now
            </AnimatedButton>
          </div>
        </div>
        <div className={styles.map}>
          <iframe
            title="High Ground Cafe and Catering map"
            src={business.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

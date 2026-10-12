import { ArrowUp, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { business } from "../data/business";
import { navLinks } from "../data/navigation";
import styles from "./Footer.module.css";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.brand}>High Ground</p>
          <p className={styles.tag}>Cafe and Catering · Dandenong South</p>
          <p className={styles.address}>{business.address.display}</p>
          <div className={styles.socials} aria-label="Social media">
            {business.socials.map((social) => {
              const Icon = socialIcons[social.id];
              if (!Icon) return null;
              return (
                <a
                  key={social.id}
                  className={styles.social}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
        <nav aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.id} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.contact}>
          <a href={business.phoneHref}>{business.phone}</a>
          <a href={business.emailHref}>{business.email}</a>
          <a href={business.website} target="_blank" rel="noreferrer">
            highgroundcafe.com.au
          </a>
          <a href={business.uberEatsUrl} target="_blank" rel="noreferrer">
            Order on Uber Eats
          </a>
          <p>
            {business.hours.weekdays}
            <br />
            {business.hours.weekend}
          </p>
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {business.name}
        </p>
        <a className={styles.top} href="#top">
          Back to top <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

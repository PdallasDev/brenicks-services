import { formatPrice, type Service } from "@/lib/services";
import TypedText from "./TypedText";
import styles from "./ServiceCard.module.css";

type Props = {
  service: Service;
  index: number;
};

export default function ServiceCard({ service, index }: Props) {
  const headingId = `${service.id}-title`;

  return (
    <article id={service.id} className={styles.card} aria-labelledby={headingId}>
      <span className={styles.number} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h2 id={headingId} className={styles.title}>
        <TypedText text={service.name} delay={index * 250} />
      </h2>

      <p className={styles.description}>{service.description}</p>

      <div className={styles.price}>
        <span className={styles.priceLabel}>Starting at</span>
        <span className={styles.priceAmount}>{formatPrice(service.startingPrice)}</span>
        <span className={styles.priceNote}>{service.startingPrice.note}</span>
      </div>

      <a className={styles.link} href={service.url} target="_blank" rel="noopener noreferrer">
        Explore {service.name}
        <span className={styles.arrow} aria-hidden="true">
          &nbsp;→
        </span>
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    </article>
  );
}

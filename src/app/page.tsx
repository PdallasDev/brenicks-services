import ServiceCard from "@/components/ServiceCard";
import ServiceCube from "@/components/ServiceCube";
import { getServices } from "@/lib/services";
import styles from "./page.module.css";

export default function Home() {
  const services = getServices();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <p className={styles.brand}>The Brenicks Group</p>
        <ServiceCube services={services} />
        <p className={styles.eyebrow}>What we do</p>
        <h1 className={styles.heading}>
          Three services. <em>One partner.</em>
        </h1>
        <p className={styles.lede}>
          Enterprise-quality AI, Salesforce and web work for the small businesses that need it most,
          without bloated quotes or vague scopes.
        </p>
      </header>

      <section className={styles.grid} aria-label="Services">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </section>

      <footer className={styles.footer}>
        Prices in USD, taken from{" "}
        <a href="https://brenicks.com" target="_blank" rel="noopener noreferrer">
          brenicks.com
        </a>
        . Raleigh, North Carolina.
      </footer>
    </main>
  );
}

import React from "react";
import Image from "next/image";
import styles from "@/styles/components/Footer.module.scss";

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <span className={styles.brand}>
        <span className={styles.copy}><span className={styles.logo} aria-hidden="true">
          <Image src="/images/logo.svg" alt="Belén Ibáñez logo" width={16} height={16} />
        </span> © {new Date().getFullYear()} Belén Ibáñez. All rights reserved.</span>


      </span>

      <span className={styles.social}>
        <a
          href="https://www.linkedin.com/in/belenibanez/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className={styles.iconLink}
        >
          <Image src="/images/footer/linkedin.svg" alt="LinkedIn" width={16} height={16} />
        </a>

        <a
          href="https://github.com/beluiba"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
          className={styles.iconLink}
        >
          <Image src="/images/footer/github.svg" alt="GitHub" width={20} height={20} />
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;
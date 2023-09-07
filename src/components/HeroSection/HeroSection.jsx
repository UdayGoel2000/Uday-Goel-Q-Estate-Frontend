import React from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <div className={styles.heroSection}>
      <h1 className={`${styles.heroTitle} ${styles.letterAnimation}`}>
        Where Quality Homes and Exceptional Service Create Your Perfect Real
        Estate Experience
      </h1>
    </div>
  );
}

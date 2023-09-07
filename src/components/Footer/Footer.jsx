import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.firstCol}>
        <h1 className={styles.companyName}>QEstate Homes</h1>
        <div className={styles.companyDescription}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          velit molestias ea dolor fugiat dignissimos at nam veritatis aliquid,
          accusamus cupiditate ab facere corporis fugit officia neque voluptates
          provident a.
        </div>
      </div>
      <div className={styles.fourthCol}>
        <h2 className={styles.linkHeader}>Contact</h2>
        <ul className={styles.linkItems}>
          <li>Bengaluru, India</li>
          <li>qestate@gmail.com</li>
          <li>+91900000112</li>
          <li>+021 93489223</li>
        </ul>
      </div>
    </footer>
  );
}

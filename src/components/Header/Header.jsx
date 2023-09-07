import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ onPage }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        QEstate
      </div>
      {onPage === "home" ? (
        <div className={styles.navLink} onClick={() => navigate("/listings")}>
          <span>Explore</span>
        </div>
      ) : onPage === "listings" ? (
        <div className={styles.navLink} onClick={() => navigate("/")}>
          Featured Listings
        </div>
      ) : (
        <div className={styles.navList}>
          <div className={styles.navLink} onClick={() => navigate("/")}>
            Featured
          </div>
          <div className={styles.navLink} onClick={() => navigate("/listings")}>
            Explore
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

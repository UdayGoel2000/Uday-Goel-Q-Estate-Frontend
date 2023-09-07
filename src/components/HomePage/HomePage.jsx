import React from "react";
import Header from "../Header/Header";
import styles from "./HomePage.module.css";
import HeroSection from "../HeroSection/HeroSection";
import FeaturedListing from "../FeaturedListing/FeaturedListing";
import Footer from "../Footer/Footer";

const HomePage = () => {
  return (
    <div className={styles.landingPageContainer}>
      <Header onPage="home" />
      <HeroSection />

      <div className={styles.cardContainer}>
        <h1 className={styles.featuredListingsTitle}>
          Here are some of our featured listings:
        </h1>

        <FeaturedListing />
      </div>
      <Footer />
    </div>
  );
};
export default HomePage;

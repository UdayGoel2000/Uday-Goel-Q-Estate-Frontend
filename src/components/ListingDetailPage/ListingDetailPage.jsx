import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from "./ListingDetailPage.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { PiSmileySadBold } from "react-icons/pi";
import Footer from "../Footer/Footer";

const ListingDetailPage = () => {
  const { property_id } = useParams();
  const [property, setProperty] = useState(null);

  const fetchListing = async () => {
    try {
      const response = await axios.get(
        `${config.backendEndpoint}/real-estate-data`
      );
      const data = response.data.listings;

      setProperty(data.find((ele) => ele.property_id === Number(property_id)));
    } catch (err) {
      setProperty(null);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.detailPageContainer}>
        {property ? (
          <>
            <div className={styles.imageContainer}>
              <img
                src="/assets/real-estate-detail.jpg"
                alt={"property-detail"}
                loading="lazy"
              />
            </div>

            <div className={styles.propertyDetails}>
              {" "}
              <h1>{property.property_name}</h1>
              <div>
                {`${property.description}`} Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Delectus, obcaecati pariatur
                laborum soluta voluptatum nostrum aut illo consectetur
                molestiae. Tempora, sequi recusandae dolore necessitatibus
                temporibus molestiae rerum corrupti, nulla maiores repudiandae
                enim perspiciatis odit, natus accusantium quidem blanditiis
                delectus eum repellat saepe? Numquam quibusdam asperiores
                tenetur fugiat quam consectetur quidem?
              </div>
              <div className={styles.agentDetails}>
                <h2 className={styles.agentDetailsHeader}>Contact</h2>
                <div className={styles.agentDetailsContent}>
                  <span className={styles.title}>Agent Name:</span>
                  <span>John Smith</span>
                  <span className={styles.title}>Email:</span>
                  <span>johnsmith@gmail.com</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.errorMessage}>
            <p>Details Unavailable at the moment!</p> <PiSmileySadBold />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ListingDetailPage;

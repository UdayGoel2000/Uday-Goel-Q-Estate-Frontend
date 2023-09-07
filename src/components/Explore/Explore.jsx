import React from "react";
import styles from "./Explore.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CheckBoxFilters from "../CheckBoxFilters/CheckBoxFilters";
import SortingFilters from "../SortingFilters/SortingFilters";
import ListingsTableView from "../ListingsTableView/ListingsTableView";

const Explore = () => {
  const [listingsData, setListingsData] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState([]);
  const [sortBy, setSortBy] = useState("");

  async function fetchListings() {
    try {
      const response = await axios.get(
        `${config.backendEndpoint}/real-estate-data`
      );
      const data = response.data.listings;
      setListingsData(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleLocaltionFilterChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setLocationFilter((prevState) => [...prevState, event.target.value]);
    } else {
      setLocationFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
    }
  };

  const handlePriceRangeFilterChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked)
      setPriceRangeFilter((prevState) => [...prevState, event.target.value]);
    else
      setPriceRangeFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      <Header onPage="listings" />

      <div className={styles.propertyListingsView}>
        <CheckBoxFilters
          locationFilter={locationFilter}
          handleLocationFilterChange={handleLocaltionFilterChange}
          priceRangeFilter={priceRangeFilter}
          handlePriceRangeFilterChange={handlePriceRangeFilterChange}
        />
        <SortingFilters
          sortBy={sortBy}
          handleSortByChange={handleSortByChange}
        />
        <ListingsTableView
          listingsData={listingsData}
          locationFilter={locationFilter}
          priceRangeFilter={priceRangeFilter}
          sortBy={sortBy}
        />
      </div>
      <Footer />
    </>
  );
};

export default Explore;

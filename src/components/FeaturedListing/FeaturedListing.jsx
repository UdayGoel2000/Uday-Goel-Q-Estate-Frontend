import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
import config from "../../config";
import styles from "./FeaturedListing.module.css";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PiSmileySadBold } from "react-icons/pi";

export default function FeaturedListing() {
  const [listingsData, setListingsData] = useState([]);
  const navigate = useNavigate();

  //fetch listings data:
  async function fetchListings() {
    try {
      const response = await axios.get(
        `${config.backendEndpoint}/real-estate-data`
      );
      const data = response.data.listings;

      //only 8 listing to be displayed:
      setListingsData(data.slice(0, 8));
    } catch (err) {
      setListingsData([]);
      console.log(err);
    }
  }

  //on page load, fetch listing data
  useEffect(() => {
    fetchListings();
  }, []);

  //render:
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 2, sm: 3, md: 5 }}>
        {listingsData.length === 0 ? (
          <Grid item>
            <div className={styles.errorMessage}>
              <p>No Featured Listings Found!</p>
              <PiSmileySadBold />
            </div>
          </Grid>
        ) : (
          listingsData.map((ele, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea
                  onClick={() => navigate(`/detail/${ele.property_id}`)}
                >
                  <CardMedia
                    sx={{ height: 200 }}
                    image={`/assets/real-estate-${index}.jpg`}
                    title="green iguana"
                    loading="lazy"
                  />
                  <CardContent className={styles.propertyName}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ wordBreak: "breakAll" }}
                    >
                      {ele.property_name.slice(0, 6)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div className={styles.listingDetail}>
                      <span className={styles.propertyPrice}>
                        Rs {ele.price}
                      </span>
                      <span className={styles.propertyCity}>
                        {ele.city.slice(0, 5)}
                      </span>
                    </div>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

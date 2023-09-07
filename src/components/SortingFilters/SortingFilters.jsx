import React from "react";
import styles from "../Explore/Explore.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const options = ["none", "price", "date"];

export default function SortingFilters({ sortBy, handleSortByChange }) {
  return (
    <div className={styles.sortingFilterContainer}>
      <h2 className={styles.title}>Sort By:</h2>
      <Box className={styles.dropdown} sx={{ minWidth: 120 }}>
        <FormControl fullWidth size="small">
          <Select
            labelId="sorting-label"
            id="demo-simple-select"
            value={sortBy}
            name={sortBy}
            onChange={handleSortByChange}
          >
            {options.map((ele, index) => (
              <MenuItem key={index} value={ele}>
                {ele && ele[0].toUpperCase() + ele.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

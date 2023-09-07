import React from "react";
import { useState, useEffect } from "react";
import styles from "./ListingsTableView.module.css";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import EditModal from "../EditModal/EditModal";
import { useNavigate } from "react-router-dom";

export default function ListingsTableView({
  listingsData,
  locationFilter,
  priceRangeFilter,
  sortBy,
}) {
  //states:
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  //variables:
  const itemsPerPage = 10;
  let displayData = applyFilters(
    filteredData,
    locationFilter,
    priceRangeFilter,
    sortBy
  );
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const isAllSelected = selectedRows.length === itemsPerPage;

  //useEffects:
  useEffect(() => {
    setFilteredData(listingsData);
  }, [listingsData]);

  //EDITING:
  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    setSelectedRows([]);
  }, [filteredData]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [locationFilter, priceRangeFilter]);

  const handleEditSave = (editedItem) => {
    const updatedData = [...filteredData];
    const indexToBeEdited = updatedData.findIndex(
      (item) => item.property_id === editingItem.property_id
    );

    if (indexToBeEdited !== -1) {
      updatedData[indexToBeEdited] = editedItem;
      setFilteredData(updatedData);
    }

    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  //MODALS OPERATION:
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      //If the items is checked, push it into selectedRows array
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (event, displayData) => {
    if (event.target.checked) {
      const startIndex = (currentPage - 1) * itemsPerPage;

      let rowsSelected = [];
      for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
        if (i < displayData.length)
          rowsSelected.push(displayData[i].property_id);
        else rowsSelected.push(Math.random());
      }

      setSelectedRows(rowsSelected);
    } else {
      setSelectedRows([]);
    }
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
    setSelectedRows([]);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setSelectedRows([]);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setSelectedRows([]);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setSelectedRows([]);
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
    setSelectedRows([]);
  };

  const handleDelete = (id) => {
    const updatedData = filteredData.filter((ele) => ele.property_id !== id);
    //// If all elements on the last page are deleted, adjust the currentPage:
    const updatedTotalPages = Math.ceil(updatedData.length / itemsPerPage);
    if (currentPage > updatedTotalPages) {
      setCurrentPage(updatedTotalPages);
    }

    setFilteredData(updatedData);

    setSelectedRows([]);
  };

  const handleDeleteAllSelected = () => {
    if (!selectedRows.length) return;
    const updatedData = filteredData.filter(
      (ele) => !selectedRows.includes(ele.property_id)
    );
    //// If all elements on the last page are deleted, adjust the currentPage:
    const updatedTotalPages = Math.ceil(updatedData.length / itemsPerPage);
    if (currentPage > updatedTotalPages) {
      setCurrentPage(updatedTotalPages);
    }

    setFilteredData(updatedData);

    setSelectedRows([]);
  };

  //STATIC METHODS:

  const getPageNumbers = (totalPages) => {
    const pageNumbers = [];
    for (let currPage = 1; currPage <= totalPages; currPage++)
      pageNumbers.push(currPage);
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers(totalPages);

  function applyFilters(filteredData, location, priceRange, sortBy) {
    let updatedData = [...filteredData];

    if (location.length) {
      updatedData = updatedData.filter((listing) =>
        location.includes(listing.city)
      );
    }

    if (priceRange.length) {
      updatedData = updatedData.filter((listing) => {
        let found = false;
        priceRange.forEach((rangeEntry) => {
          let low = rangeEntry.split("-")[0];
          let high = rangeEntry.split("-")[1];
          if (
            Number(listing.price) >= Number(low) &&
            Number(listing.price) <= Number(high)
          )
            found = true;
        });
        return found;
      });
    }

    if (sortBy === "price") {
      updatedData.sort(
        (firstListing, secondListing) =>
          firstListing.price - secondListing.price
      );
    } else if (sortBy === "date") {
      updatedData.sort(
        (firstListing, secondListing) =>
          new Date(firstListing.listing_date) -
          new Date(secondListing.listing_date)
      );
    }

    return updatedData;
  }

  return (
    <div className={styles.listingsTableContainer}>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(event) => handleSelectAll(event, displayData)}
              />
            </th>
            <th>Property Name</th>
            <th>Price</th>
            <th>Address</th>
            <th>Listing Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayData.slice(startIndex, endIndex).map((items, index) => (
            <tr
              className={`${styles.tableRow} ${
                selectedRows.includes(items.property_id) ? styles.selected : ""
              }`}
              key={index}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(items.property_id)}
                  onChange={(event) =>
                    handleRowCheckboxChange(event, items.property_id)
                  }
                />
              </td>
              <td
                className={styles.propertyName}
                onClick={() => navigate(`/detail/${items.property_id}`)}
              >
                {items.property_name}
              </td>
              <td>Rs{items.price}</td>
              <td>{items.address}</td>
              <td>{items.listing_date}</td>
              <td className={styles.actionItems}>
                <MdDelete
                  onClick={() => handleDelete(items.property_id, displayData)}
                />
                <TbEdit onClick={() => handleEdit(items)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.tableFooter}>
        <button onClick={handleDeleteAllSelected}>Delete Selected</button>
        <div className={styles.paginationContainer}>
          <span>
            Page {totalPages < 1 ? 0 : currentPage} of {totalPages}
          </span>
          <div className={styles.pagination}>
            <button onClick={handleFirstPage} disabled={currentPage === 1}>
              First
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageClick(number)}
                className={`${number === currentPage ? styles.active : ""}`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditModal
          item={editingItem}
          onSave={handleEditSave}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}

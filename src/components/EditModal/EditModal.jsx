import React, { useState } from "react";
import styles from "./EditModal.module.css";

const EditModal = ({ item, onSave, onClose, displayData }) => {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSaveClick = () => {
    onSave(editedItem, displayData);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edit Property</h2>
        <label>Property Name</label>
        <input
          type="text"
          name="property_name"
          value={editedItem.property_name}
          onChange={handleInputChange}
        />
        <label>Price</label>
        <input
          type="text"
          name="price"
          value={editedItem.price}
          onChange={handleInputChange}
        />
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={editedItem.address}
          onChange={handleInputChange}
        />
        {/* Add more input fields for other properties */}
        <div className={styles.modalButtons}>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

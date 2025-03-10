// src/pages/AddItemPage.js
import React from 'react';
import ItemForm from '../manager/ItemForm';

const AddItemPage = () => {
  return (
    <div className="add-item-page">
      <h1>Add New Item</h1>
      <ItemForm />
    </div>
  );
};

export default AddItemPage;

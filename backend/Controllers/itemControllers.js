
//corect one 


// import db from "../config/db.js";

// // ✅ Add a new item
// export const addItem = async (req, res) => {
//   const { item_code, item_name, item_type, quantity, item_model, item_serial, item_category, reg_date, status } = req.body;

//   if (!item_code || !item_name || !item_type || quantity === undefined) {
//     return res.status(400).json({ error: "Required fields: item_code, item_name, item_type, and quantity must be provided" });
//   }

//   try {
//     const sql = `
//       INSERT INTO items (item_code, item_name, item_type, quantity, item_model, item_serial, item_category, reg_date, status)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const values = [item_code, item_name, item_type, quantity, item_model || null, item_serial || null, item_category || null, reg_date || null, status || 'Active'];
//     const [result] = await db.query(sql, values);
//     res.status(201).json({ message: "Item added successfully!", itemId: result.insertId });
//   } catch (error) {
//     console.error("Error adding item:", error);
//     if (error.code === 'ER_DUP_ENTRY') {
//       return res.status(400).json({ error: "Item code or serial number already exists" });
//     }
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // ✅ Fetch all items
// export const getItem = async (req, res) => {
//   try {
//     const sql = "SELECT * FROM items";
//     const [result] = await db.query(sql);
//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error fetching items:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // ✅ Fetch item by item_id
// export const getItemById = async (req, res) => {
//   const { item_id } = req.params;

//   try {
//     const sql = "SELECT * FROM items WHERE item_id = ?";
//     const [result] = await db.query(sql, [item_id]);
    
//     if (result.length === 0) {
//       return res.status(404).json({ error: "Item not found" });
//     }
//     res.status(200).json(result[0]);
//   } catch (error) {
//     console.error("Error fetching item:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // ✅ Delete item by item_id
// export const deleteItem = async (req, res) => {
//   const { item_id } = req.params;

//   try {
//     const sql = "DELETE FROM items WHERE item_id = ?";
//     const [result] = await db.query(sql, [item_id]);
    
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Item not found" });
//     }
//     res.json({ message: "Item deleted successfully!" });
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // ✅ Update item by item_id
// export const updateItem = async (req, res) => {
//   const { item_code, item_name, item_type, quantity, item_model, item_serial, item_category, reg_date, status } = req.body;
//   const { item_id } = req.params;

//   if (!item_code || !item_name || !item_type || quantity === undefined) {
//     return res.status(400).json({ error: "Required fields: item_code, item_name, item_type, and quantity must be provided" });
//   }

//   try {
//     const sql = `
//       UPDATE items 
//       SET item_code = ?, item_name = ?, item_type = ?, quantity = ?, item_model = ?, item_serial = ?, item_category = ?, reg_date = ?, status = ?
//       WHERE item_id = ?
//     `;
//     const values = [item_code, item_name, item_type, quantity, item_model || null, item_serial || null, item_category || null, reg_date || null, status || 'Active', item_id];
//     const [result] = await db.query(sql, values);
    
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Item not found" });
//     }
//     console.log("Item updated:", result);
//     res.json({ message: "Item updated successfully!" });
//   } catch (error) {
//     console.error("Error updating item:", error);
//     if (error.code === 'ER_DUP_ENTRY') {
//       return res.status(400).json({ error: "Item code or serial number already exists" });
//     }
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

import db from '../config/db.js';

// ✅ Add a new item
export const addItem = async (req, res) => {
  const {
    item_id, // Manually provided item_id
    item_code,
    item_name,
    item_type,
    quantity,
    item_model,
    item_serial,
    item_category,
    threshold,
    reg_date,
    status,
  } = req.body;

  // Validate required fields
  if (!item_id || !item_code || !item_name || !item_type || quantity === undefined) {
    return res.status(400).json({
      error: 'Required fields: item_id, item_code, item_name, item_type, and quantity must be provided',
    });
  }

  try {
    const sql = `
      INSERT INTO items (item_id, item_code, item_name, item_type, quantity, item_model, item_serial, item_category, threshold, reg_date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      item_id,
      item_code,
      item_name,
      item_type,
      quantity,
      item_model || null,
      item_serial || null,
      item_category || null,
      threshold || 5,
      reg_date || null,
      status || 'Active',
    ];
    const [result] = await db.query(sql, values);
    res.status(201).json({ message: 'Item added successfully!', itemId: item_id });
  } catch (error) {
    console.error('Error adding item:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Item code, serial number, or item_id already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Get all items
export const getItems = async (req, res) => {
  try {
    const sql = 'SELECT * FROM items';
    const [items] = await db.query(sql);
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items.' });
  }
};

// ✅ Get a single item by item_id
export const getItemById = async (req, res) => {
  const { item_id } = req.params;

  try {
    const sql = 'SELECT * FROM items WHERE item_id = ?';
    const [item] = await db.query(sql, [item_id]);
    if (item.length === 0) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.status(200).json(item[0]);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Failed to fetch item.' });
  }
};

// ✅ Update an item by item_id
export const updateItem = async (req, res) => {
  const { item_id } = req.params;
  const {
    item_code,
    item_name,
    item_type,
    quantity,
    item_model,
    item_serial,
    item_category,
    threshold,
    reg_date,
    status,
  } = req.body;

  if (!item_code || !item_name || !item_type || quantity === undefined) {
    return res.status(400).json({ error: 'Required fields: item_code, item_name, item_type, and quantity must be provided' });
  }

  try {
    const sql = `
      UPDATE items 
      SET item_code = ?, item_name = ?, item_type = ?, quantity = ?, item_model = ?, item_serial = ?, item_category = ?, threshold = ?, reg_date = ?, status = ?
      WHERE item_id = ?
    `;
    const values = [
      item_code,
      item_name,
      item_type,
      quantity,
      item_model || null,
      item_serial || null,
      item_category || null,
      threshold || 5,
      reg_date || null,
      status || 'Active',
      item_id,
    ];
    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item updated successfully!' });
  } catch (error) {
    console.error('Error updating item:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Item code or serial number already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Delete an item by item_id
export const deleteItem = async (req, res) => {
  const { item_id } = req.params;

  try {
    const sql = 'DELETE FROM items WHERE item_id = ?';
    const [result] = await db.query(sql, [item_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.status(200).json({ message: 'Item deleted successfully.' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item.' });
  }
};

// ✅ Get low stock items
export const getLowStockItems = async (req, res) => {
  try {
    const sql = 'SELECT * FROM items WHERE quantity <= threshold';
    const [lowStockItems] = await db.query(sql);
    if (lowStockItems.length === 0) {
      return res.status(200).json({ message: 'No low stock items.' });
    }
    res.status(200).json(lowStockItems);
  } catch (error) {
    console.error('Error fetching low stock items:', error);
    res.status(500).json({ error: 'Failed to fetch low stock items.' });
  }
};

// ✅ Forecast item demand
export const forecastItemDemand = async (req, res) => {
  const { item_id } = req.params;

  try {
    const sql = 'SELECT quantity FROM items WHERE item_id = ?';
    const [item] = await db.query(sql, [item_id]);
    if (item.length === 0) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    const currentStock = item[0].quantity;
    const predictedDemand = Math.ceil(currentStock * 1.2); // Example: Increase by 20% for forecasting
    res.status(200).json({ message: 'Forecast generated successfully.', predictedDemand });
  } catch (error) {
    console.error('Error generating forecast:', error);
    res.status(500).json({ error: 'Failed to generate forecast.' });
  }
};
// When a stock clerk enters the item name, item code, employee ID, and the quantity to deduct from the total available stock, the system should update the database to reflect the new available quantity 


   
    
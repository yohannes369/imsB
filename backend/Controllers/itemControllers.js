import db from "../config/db.js";

// ✅ Add a new item
export const addItem = async (req, res) => {
  const { item_code, item_name, item_type, quantity, item_model, item_serial, item_category, reg_date, status } = req.body;

  if (!item_code || !item_name || !item_type || quantity === undefined) {
    return res.status(400).json({ error: "Required fields: item_code, item_name, item_type, and quantity must be provided" });
  }

  try {
    const sql = `
      INSERT INTO items (item_code, item_name, item_type, quantity, item_model, item_serial, item_category, reg_date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [item_code, item_name, item_type, quantity, item_model || null, item_serial || null, item_category || null, reg_date || null, status || 'Active'];
    const [result] = await db.query(sql, values);
    res.status(201).json({ message: "Item added successfully!", itemId: result.insertId });
  } catch (error) {
    console.error("Error adding item:", error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "Item code or serial number already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Fetch all items
export const getItem = async (req, res) => {
  try {
    const sql = "SELECT * FROM items";
    const [result] = await db.query(sql);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Fetch item by item_id
export const getItemById = async (req, res) => {
  const { item_id } = req.params;

  try {
    const sql = "SELECT * FROM items WHERE item_id = ?";
    const [result] = await db.query(sql, [item_id]);
    
    if (result.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Delete item by item_id
export const deleteItem = async (req, res) => {
  const { item_id } = req.params;

  try {
    const sql = "DELETE FROM items WHERE item_id = ?";
    const [result] = await db.query(sql, [item_id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully!" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Update item by item_id
export const updateItem = async (req, res) => {
  const { item_code, item_name, item_type, quantity, item_model, item_serial, item_category, reg_date, status } = req.body;
  const { item_id } = req.params;

  if (!item_code || !item_name || !item_type || quantity === undefined) {
    return res.status(400).json({ error: "Required fields: item_code, item_name, item_type, and quantity must be provided" });
  }

  try {
    const sql = `
      UPDATE items 
      SET item_code = ?, item_name = ?, item_type = ?, quantity = ?, item_model = ?, item_serial = ?, item_category = ?, reg_date = ?, status = ?
      WHERE item_id = ?
    `;
    const values = [item_code, item_name, item_type, quantity, item_model || null, item_serial || null, item_category || null, reg_date || null, status || 'Active', item_id];
    const [result] = await db.query(sql, values);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    console.log("Item updated:", result);
    res.json({ message: "Item updated successfully!" });
  } catch (error) {
    console.error("Error updating item:", error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "Item code or serial number already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
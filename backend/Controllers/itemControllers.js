import db from '../models/item'; // Assuming db is your database connection

// Add a new item (Only Admin)
export const addItem = async (req, res) => {
  const { Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status } = req.body;

  if (!Item_Code || !Item_Name || !Item_Type || !Quantity || !Item_Model || !Item_Serial || !Item_Category || !Reg_Date || !Status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sql = `
      INSERT INTO item (Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Item added successfully!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all items (For Managers and Admins)
export const getItems = async (req, res) => {
  try {
    const sql = "SELECT * FROM item";
    db.query(sql, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update item (Only Admin)
export const updateItem = async (req, res) => {
  const { Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status } = req.body;

  if (!Item_Code) return res.status(400).json({ error: "Item Code is required" });

  try {
    const sql = `
      UPDATE item
      SET Item_Name = ?, Item_Type = ?, Quantity = ?, Item_Model = ?, Item_Serial = ?, Item_Category = ?, Reg_Date = ?, Status = ?
      WHERE Item_Code = ?
    `;
    db.query(sql, [Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status, Item_Code], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Item updated successfully!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete item (Only Admin)
export const deleteItem = async (req, res) => {
  const { Item_Code } = req.params;

  if (!Item_Code) return res.status(400).json({ error: "Item Code is required" });

  try {
    const sql = "DELETE FROM item WHERE Item_Code = ?";
    db.query(sql, [Item_Code], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Item deleted successfully!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

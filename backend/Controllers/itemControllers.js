 // Assuming db is your database connection
 import db from "../config/db.js";
// Add a new item (Only Admin)
export const addItem = async (req, res) => {
  const { Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status } = req.body;

  if (!Item_Code || !Item_Name || !Item_Type || !Quantity || !Item_Model || !Item_Serial || !Item_Category || !Reg_Date || !Status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sql = `
      INSERT INTO items (Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status)
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

//fetch all items
export const getItems = async (req, res) => {
  try {
    const sql = "SELECT * FROM items";
    db.query(sql, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
    console.log(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
 //update item by Manager
 export const updateItem = async (req, res) => {
  const { Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status } = req.body;
  const itemCode = req.params.Item_Code;  

  if (!Item_Code || !Item_Name || !Item_Type || !Quantity || !Item_Model || !Item_Serial || !Item_Category || !Reg_Date || !Status) {
    
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sql = `
      UPDATE items 
      SET Item_Code = ?, Item_Name = ?, Item_Type = ?, Quantity = ?, Item_Model = ?, Item_Serial = ?, Item_Category = ?, Reg_Date = ?, Status = ?
      WHERE Item_Code = ?
    `;
    db.query(sql, [Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status, itemCode], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Item updated successfully!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
  }
//delete item by Manager
export const deleteItem = async (req, res) => {
  const itemCode = req.params.Item_Code;
  const sql = "DELETE FROM items WHERE Item_Code = ?";

  db.query(sql, [itemCode], (err, result) => {   
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Item deleted successfully!" });
  });
};
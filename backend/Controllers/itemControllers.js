//  // Assuming db is your database connection
//  import db from "../config/db.js";
// // Add a new item (Only Admin)
// // export const addItem = async (req, res) => {
// //   const { Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status } = req.body;

// //   if (!Item_Code || !Item_Name || !Item_Type || !Quantity || !Item_Model || !Item_Serial || !Item_Category || !Reg_Date || !Status) {
// //     return res.status(400).json({ error: "All fields are required" });
// //   }

// //   try {
// //     const sql = `
// //       INSERT INTO items (Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status)
// //       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
// //     `;
// //     db.query(sql, [Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status], (err, result) => {
// //       if (err) return res.status(500).json({ error: err.message });
// //       res.json({ message: "Item added successfully!" });
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // };

// // // fetch all item
// // // export const getItem =  (req, res) => {
// // //   try {
// // //     const sql = "SELECT * FROM items";
// // //     db.query(sql, (err, result) => {
// // //       if (err) return res.status(500).json({ error: err.message });
// // //     console.log(result);
// // //     });
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({ error: "Internal server error" });
// // //   }
// // // };
// // export const getItem = (req, res) => {
// //   try {
// //     const sql = "SELECT * FROM items";
// //     db.query(sql, (err, result) => {
// //       if (err) {
// //         return res.status(500).json({ error: err.message });
// //       }
// //       res.status(200).json(result); // Send data to the browser
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // };


//  //update item by Manager
// //  export const updateItem = async (req, res) => {
// //   const { Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status } = req.body;
// //   const itemCode = req.params.id;  

// //   if (!Item_Code || !Item_Name || !Item_Type || !Quantity || !Item_Model || !Item_Serial || !Item_Category || !Reg_Date || !Status) {
    
// //     return res.status(400).json({ error: "All fields are required" });
// //   }

// //   try {
// //     const sql = `
// //       UPDATE items 
// //       SET Item_Code = ?, Item_Name = ?, Item_Type = ?, Quantity = ?, Item_Model = ?, Item_Serial = ?, Item_Category = ?, Reg_Date = ?, Status = ?
// //       WHERE id = ?
// //     `;
// //     db.query(sql, [Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status, itemCode], (err, result) => {
// //       if (err) return res.status(500).json({ error: err.message });
// //       res.json({ message: "Item updated successfully!" });
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// //   }
// //delete item by Manager



// // ✅ Add a new item
// export const addItem = async (req, res) => {
//   const { Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status } = req.body;

//   // ✅ Validate required fields
//   if (!Item_Code || !Item_Name || !Item_Type || !Quantity || !Item_Model || !Item_Serial || !Item_Category || !Reg_Date || !Status) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const sql = `
//       INSERT INTO items (Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.query(sql, [Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status], (err, result) => {
//       if (err) return res.status(500).json({ error: err.message });

//       res.status(201).json({ message: "Item added successfully!", itemId: result.insertId });
//     });

//   } catch (error) {
//     console.error("Error adding item:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // ✅ Fetch all items
// export const getItem = (req, res) => {
//   try {
//     const sql = "SELECT * FROM items";

//     db.query(sql, (err, result) => {
//       if (err) return res.status(500).json({ error: err.message });

//       res.status(200).json(result); // Send fetched data
//     });

//   } catch (error) {
//     console.error("Error fetching items:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// export const deleteItem = async (req, res) => {
//   const itemCode = req.params.id;
//   const sql = "DELETE FROM items WHERE id = ?";

//   db.query(sql, [itemCode], (err, result) => {   
//     if (err) return res.status(500).json({ error: err.message });
//     res.json({ message: "Item deleted successfully!" });
//   });
// };




// export const updateItem = async (req, res) => {
//   const { Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status } = req.body;
//   const { id } = req.params;  // ✅ Get item ID from URL params

//   // ✅ Validate required fields
//   if (!Item_Code || !Item_Name || !Item_Type || !Quantity || !Item_Model || !Item_Serial || !Item_Category || !Reg_Date || !Status) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const sql = `
//       UPDATE items 
//       SET Item_Code = ?, Item_Name = ?, Item_Type = ?, Quantity = ?, Item_Model = ?, Item_Serial = ?, Item_Category = ?, Reg_Date = ?, Status = ?
//       WHERE id = ?
//     `;

//     db.query(sql, [Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status, id], (err, result) => {
//       if (err) return res.status(500).json({ error: err.message });

//       if (result.affectedRows === 0) {
//         return res.status(404).json({ error: "Item not found" });
//       }

//       res.json({ message: "Item updated successfully!" });
//     });

//   } catch (error) {
//     console.error("Error updating item:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
import db from "../config/db.js";

// ✅ Add a new item
export const addItem = async (req, res) => {
  const { Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status } = req.body;

  // ✅ Validate required fields
  if (!Item_Code || !Item_Name || !Item_Type || !Quantity || !Item_Model || !Item_Serial || !Item_Category || !Reg_Date || !Status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sql = `
      INSERT INTO items (Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status]);
    res.status(201).json({ message: "Item added successfully!", itemId: result.insertId });

  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Fetch all items
export const getItem = async (req, res) => {
  try {
    const sql = "SELECT * FROM items";
    const [result] = await db.query(sql);
    res.status(200).json(result); // Send fetched data

  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Delete item by ID
export const deleteItem = async (req, res) => {
  const itemCode = req.params.id;
  const sql = "DELETE FROM items WHERE id = ?";

  try {
    const [result] = await db.query(sql, [itemCode]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully!" });

  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Update item by ID
export const updateItem = async (req, res) => {
  const { Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status } = req.body;
  const { id } = req.params;  // ✅ Get item ID from URL params

  // ✅ Validate required fields
  if (!Item_Code || !Item_Name || !Item_Type || !Quantity || !Item_Model || !Item_Serial || !Item_Category || !Reg_Date || !Status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sql = `
      UPDATE items 
      SET Item_Code = ?, Item_Name = ?, Item_Type = ?, Quantity = ?, Item_Model = ?, Item_Serial = ?, Item_Category = ?, Reg_Date = ?, Status = ?
      WHERE id = ?
    `;

    const [result] = await db.query(sql, [Item_Code, Item_Name, Item_Type, Quantity, Item_Model, Item_Serial, Item_Category, Reg_Date, Status, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item updated successfully!" });

  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

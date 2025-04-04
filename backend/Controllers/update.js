// import db from '../config/db.js';

// export const updateInventory = async (req, res) => {
//   try {
//     const { item_name, item_id, employee_id, quantity } = req.body;

//     // Validate quantity to deduct
//     if (quantity <= 0) {
//       const errorMessage = 'Quantity to deduct must be greater than 0';
//       console.error(errorMessage); // Log error in the console
//       return res.status(400).json({ error: errorMessage });
//     }

//     // Check if the item exists and has enough quantity
//     const [result] = await db.query('SELECT quantity FROM items WHERE item_id = ?', [item_id]);

//     if (result.length === 0) {
//       const errorMessage = `Item with ID ${item_id} not found`;
//       console.error(errorMessage); // Log error in the console
//       return res.status(404).json({ error: errorMessage });
//     }

//     const currentQuantity = result[0].quantity;

//     // Ensure that there is enough stock to deduct
//     if (quantity > currentQuantity) {
//       const errorMessage = `Not enough stock available for item ${item_name} (ID: ${item_id}). Requested: ${quantity}, Available: ${currentQuantity}`;
//       console.error(errorMessage); // Log error in the console
//       return res.status(400).json({ error: errorMessage });
//     }

//     // Calculate the new quantity
//     const newQuantity = currentQuantity - quantity;

//     // Update the inventory table with the new quantity
//     await db.query(
//       'UPDATE items SET quantity = ? WHERE item_id = ?',
//       [newQuantity, item_id]
//     );

//     // Log the successful update
//     const successMessage = `Item ${item_name} with ID ${item_id} updated by employee ${employee_id}. New quantity: ${newQuantity}`;
//     console.log(successMessage); // Log success in the console

//     // Return success response
//     res.status(200).json({
//       message: `Item quantity updated successfully. New quantity: ${newQuantity}`,
//       item_name,
//       item_id,
//       quantity: newQuantity
//     });
//   } catch (error) {
//     console.error('Error updating inventory:', error); // Log the error stack trace
//     res.status(500).json({ error: error.message });
//   }
// };

import db from '../config/db.js';

export const updateInventory = async (req, res) => {
  const connection = await db.getConnection(); // Assuming you are using a connection pool
  try {
    const { item_name, item_id, employee_id, quantity } = req.body;

    // Validate quantity to deduct
    if (quantity <= 0) {
      const errorMessage = 'Quantity to deduct must be greater than 0';
      console.error(errorMessage); // Log error in the console
      return res.status(400).json({ error: errorMessage });
    }

    // Start a transaction to ensure both actions happen atomically
    await connection.beginTransaction();

    // Check if the item exists and has enough quantity
    const [result] = await connection.query('SELECT quantity FROM items WHERE item_id = ?', [item_id]);

    if (result.length === 0) {
      const errorMessage = `Item with ID ${item_id} not found`;
      console.error(errorMessage); // Log error in the console
      return res.status(404).json({ error: errorMessage });
    }

    const currentQuantity = result[0].quantity;

    // Ensure that there is enough stock to deduct
    if (quantity > currentQuantity) {
      const errorMessage = `Not enough stock available for item ${item_name} (ID: ${item_id}). Requested: ${quantity}, Available: ${currentQuantity}`;
      console.error(errorMessage); // Log error in the console
      return res.status(400).json({ error: errorMessage });
    }

    // Calculate the new quantity
    const newQuantity = currentQuantity - quantity;

    // Update the inventory table with the new quantity
    await connection.query(
      'UPDATE items SET quantity = ? WHERE item_id = ?',
      [newQuantity, item_id]
    );

    // Insert a record into the taken_items table
    await connection.query(
      'INSERT INTO taken_items (item_id, item_name, employee_id, quantity) VALUES (?, ?, ?, ?)',
      [item_id, item_name, employee_id, quantity]
    );

    // Commit the transaction
    await connection.commit();

    // Log the successful update
    const successMessage = `Item ${item_name} with ID ${item_id} updated by employee ${employee_id}. New quantity: ${newQuantity}`;
    console.log(successMessage); // Log success in the console

    // Return success response
    res.status(200).json({
      message: `Item quantity updated successfully. New quantity: ${newQuantity}`,
      item_name,
      item_id,
      quantity: newQuantity
    });
  } catch (error) {
    // If an error occurs, rollback the transaction
    await connection.rollback();
    console.error('Error updating inventory:', error); // Log the error stack trace
    res.status(500).json({ error: error.message });
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
};


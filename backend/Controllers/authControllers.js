import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
// import { response } from "express";

// Register Employee
export const register = async (req, res) => {
  const { first_name, last_name, email, password, role, phone_number } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO employees (first_name, last_name, email, password_hash, role, phone_number) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [first_name, last_name, email, hashedPassword, role, phone_number], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee Registered Successfully!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login Employee
export const login = async (req, res) => {
 // use from invirometnt varibe
 const jwtSecret = process.env.JWT_SECRET || "book";
  try {
    const { email, password } = req.body;
    const sql = "SELECT * FROM employees WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });

      const validPassword = await bcrypt.compare(password, results[0].password_hash);
      if (!validPassword) return res.status(401).json({ error: "Invalid email or password" });

      const token = jwt.sign({ employee_id: results[0].employee_id, role: results[0].role }, jwtSecret, { expiresIn: "1h" });
      res.json({ message: "Login successful!", token , role: results[0].role });

      //show role in console log
  
      console.log(results[0].role);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//delete user




// Protect the deleteUser route


  //fetch user data
  
    
export const fetchData = (req, res) => {
  const sql = "SELECT * FROM employees";  

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json(results); // Send response to client
  });
};
//delate by email
export const deleteUser = async (req, res) => {
  const email = req.params.email;
  const sql = "DELETE FROM employees WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message }); 
    res.json({ message: "Employee deleted successfully!" });
  });
};

// update user by email
export const updateUser = async (req, res) => {
  try {
    const { first_name, last_name, role, phone_number } = req.body;
    const email = req.params.email;

    // Check if any fields are provided for update
    if (!first_name && !last_name && !role && !phone_number) {
      return res.status(400).json({ error: "No update fields provided" });
    }

    const sql = `
      UPDATE employees 
      SET first_name = ?, last_name = ?, role = ?, phone_number = ?
      WHERE email = ?
    `;

    db.query(sql, [first_name, last_name, role, phone_number, email], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      // Check if any row was affected (if user exists)
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Employee not found" });
      }

      res.json({ message: "Employee updated successfully!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Logout Employee
export const logout = async (req, res) => {
  res.json({ message: "Logout successful!" });
};  

// item conteroler 




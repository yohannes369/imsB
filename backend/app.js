// filepath: /c:/Users/user/Documents/po/Inventory-B/imsB/backend/app.js
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Ensure this line is present

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: "localhost", 
  user:   "root",
  password:  "", // Ensure empty string if no password
  database: "ims",

});

db.connect((err) => {
  if (err) throw err;
  console.log(" Database Connected...");
});

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to Inventory Management System API 🚀");
});

// Import Routes
// const employeeRoutes = require("./routes/employees");
// app.use("/employees", employeeRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
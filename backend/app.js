import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import router from "./Routes/authRoute.js"; // Import authRoutes
import jwt from "jsonwebtoken";
dotenv.config(); // Ensure this line is present

const app = express();

app.use(cors());
app.use(express.json());

// Check database connection
db.getConnection((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

// Use auth routes
app.use("/api/auth", router);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
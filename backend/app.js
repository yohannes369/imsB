import express from 'express';
import dotenv from 'dotenv';
import Db from './config/db.js'; // Ensure this file correctly exports the DB connection

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json());

// ✅ Corrected Route: Register Employee
app.get('/api/employees/register', (req, res) => {
  console.log("Register Employee API Hit");
  res.status(200).json({ message: "Register Employee API Working" });
});

// ✅ Default Route (Test Endpoint)
app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
});

// ✅ Use Environment Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

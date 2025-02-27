const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Register Employee
export const register = async (req, res) => {
  const { first_name, last_name, email, password, role, phone_number } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO employees (first_name, last_name, email, password_hash, role, phone_number) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [first_name, last_name, email, hashedPassword, role, phone_number], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    // res.json({ message: "Employee Registered Successfully!" });
    console.log("Employee Registered Successfully!");
  });
};

// Login Employee
// export const loginEmployee = (req, res) => {
//   const { email, password } = req.body;
//   const sql = "SELECT * FROM employees WHERE email = ?";

//   db.query(sql, [email], async (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });

//     const validPassword = await bcrypt.compare(password, results[0].password_hash);
//     if (!validPassword) return res.status(401).json({ error: "Invalid email or password" });

//     const token = jwt.sign({ employee_id: results[0].employee_id, role: results[0].role }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     res.json({ message: "Login successful!", token });
//   });
// };

// // Get All Employees
// exports.getAllEmployees = (req, res) => {
//   db.query("SELECT employee_id, first_name, last_name, email, role, phone_number FROM employees", (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// };

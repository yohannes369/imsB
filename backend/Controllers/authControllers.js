
import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import multer from 'multer';
import jwt from "jsonwebtoken";
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpeg, jpg, png) are allowed'));
  },
});

// Export multer middleware
export const uploadMiddleware = upload.single('profile_photo');

// Register Employee Route
export const register = async (req, res) => {
  const { employee_id, first_name, last_name, email, password, role, phone_number } = req.body;
  const profile_photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Validate required fields
  if (!employee_id || !first_name || !last_name || !email || !password || !role) {
    console.log('Validation error: All required fields must be filled');
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  try {
    // Check if email or employee_id already exists
    const checkEmailSql = 'SELECT * FROM employees WHERE email = ? OR employee_id = ?';
    const [existingUser] = await db.query(checkEmailSql, [email, employee_id]);

    if (existingUser.length > 0) {
      console.log('Validation error: Email or Employee ID already exists');
      return res.status(400).json({ error: 'Email or Employee ID already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new employee into the database
    const sql = `
      INSERT INTO employees (employee_id, first_name, last_name, email, password_hash, role, phone_number, profile_photo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      employee_id,
      first_name,
      last_name,
      email,
      hashedPassword,
      role,
      phone_number || null,
      profile_photo,
    ]);

    console.log('Employee registered successfully:', result);
    res.json({ message: 'Employee registered successfully!', id: result.insertId });
  } catch (error) {
    console.error('Error registering employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// ✅ Login Employee
// Login Route
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const sql = "SELECT * FROM Employees WHERE email = ?";
//     const [results] = await db.query(sql, [email]);

//     if (results.length === 0) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     const user = results[0];

//     // Check if the user is active
//     if (user.status === "Inactive") {
//       return res.status(403).json({ error: "Your account has been deactivated. Please contact the admin." });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user.employee_id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ message: "Login successful", token, role: user.role });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// Login Route
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const sql = "SELECT * FROM employees WHERE email = ?";
    const [results] = await db.query(sql, [email]);

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = results[0];

    // Check if the user is active
    if (user.status === "Inactive") {
      return res.status(403).json({ error: "Your account has been deactivated. Please contact the admin." });
    }

    // Check if the password_hash field is defined
    if (!user.password_hash) {
      return res.status(400).json({ error: "Password not found for the user" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.employee_id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Fetch All Employees
export const getAllEmployees = async (req, res) => {
  const sql = "SELECT * FROM Employees";

  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Fetch Employee by ID
export const getEmployeeById = async (req, res) => {
  const { employee_id } = req.params; // Extract employee_id from URL parameters

  const sql = "SELECT * FROM Employees WHERE employee_id = ?";

  try {
    const [results] = await db.query(sql, [employee_id]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(results[0]);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Update Employee
export const updateEmployee = async (req, res) => {
  const { employee_id } = req.params; // Extract employee_id from URL parameters
  const { first_name, last_name, email, role, phone_number, status } = req.body;
  const profile_photo = req.file ? `/uploads/${req.file.filename}` : null; // Use multer's req.file for profile photo

  try {
    // Check if the email already exists for a different employee
    const checkEmailSql = 'SELECT * FROM Employees WHERE email = ? AND employee_id != ?';
    const [existingUser] = await db.query(checkEmailSql, [email, employee_id]);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already exists for another employee' });
    }

    let sql, values;

    if (profile_photo) {
      // If a new profile photo is uploaded, include it in the update query
      sql = `
        UPDATE Employees 
        SET first_name = ?, last_name = ?, email = ?, role = ?, phone_number = ?, profile_photo = ?, status = ?
        WHERE employee_id = ?
      `;
      values = [first_name, last_name, email, role, phone_number, profile_photo, status, employee_id];
    } else {
      // If no new profile photo is uploaded, exclude it from the update query
      sql = `
        UPDATE Employees 
        SET first_name = ?, last_name = ?, email = ?, role = ?, phone_number = ?, status = ?
        WHERE employee_id = ?
      `;
      values = [first_name, last_name, email, role, phone_number, status, employee_id];
    }

    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully!" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};







// ✅ Delete Employee
export const deleteEmployee = async (req, res) => {
  const { employee_id } = req.params; // Extract employee_id from URL parameters

  const sql = "DELETE FROM Employees WHERE employee_id = ?";

  try {
    const [result] = await db.query(sql, [employee_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully!" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const toggleStatus = async (req, res) => {
  const { employee_id } = req.params;
  const { status } = req.body;

  if (!["Active", "Inactive"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const sql = "UPDATE Employees SET status = ? WHERE employee_id = ?";
    const [result] = await db.query(sql, [status, employee_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: `User status updated to ${status}` });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};






// ✅ Logout Employee
export const logout = async (req, res) => {
  res.json({ message: "Logout successful!" });
};
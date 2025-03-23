
import express from "express";
import { 
  register, 
  login, 
  getAllEmployees, 
  getEmployeeById, 
  updateEmployee, 
  deleteEmployee,
  toggleStatus,
  logout,
  uploadMiddleware // Import the upload middleware
} from "../Controllers/authControllers.js";

const router = express.Router();

// Routes with /api/employees base path assumed in main server file

// ✅ Register a new employee with file upload middleware
router.post("/register", uploadMiddleware, register); // POST /api/employees/register

// ✅ Employee login
router.post("/login", login); // POST /api/employees/login

// ✅ Fetch all employees
router.get("/fetchData", getAllEmployees); // GET /api/employees/fetchData

// ✅ Fetch an employee by ID
router.get("/getUserById/:employee_id", getEmployeeById); // GET /api/employees/getUserById/:employee_id

// ✅ Update an employee's details
router.post("/updateUser/:employee_id", updateEmployee); // PUT /api/employees/updateUser/:employee_id

// ✅ Delete an employee by ID
router.delete("/deleteUser/:employee_id", deleteEmployee); // DELETE /api/employees/deleteUser/:employee_id

// ✅ Toggle employee status
router.put("/toggleStatus/:employee_id", toggleStatus);

// ✅ Logout an employee
router.post("/logout", logout); // POST /api/employees/logout

export default router;



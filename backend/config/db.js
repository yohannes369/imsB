
import mysql from 'mysql2';

// Database connection using createPool
const Db = mysql.createPool({
  // host: "localhost",
  // user: "ims", // Ensure this user exists in MySQL
  // password: "123456", // Ensure this password is correct
  // database: "ims",
  // connectionLimit: 10
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASS,
  database:process.env.DB_NAME,
  connectionLimit: 10
    
});

// Test database connection
Db.execute("SELECT 'test' AS message", (err, result) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected successfully:", result);
  }
});
// Export the database connection
export default Db;
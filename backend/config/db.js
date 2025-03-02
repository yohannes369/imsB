import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10
});

export default db;
import mysql2 from "mysql2";

const Db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

Db.connect((err) => {
  if (err) console.error(" Database connection failed:", err);
  else console.log("database connected !");
});

export default Db;

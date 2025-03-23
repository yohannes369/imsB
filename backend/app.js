
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import db from "./config/db.js";
// import authRoute from "./Routes/authRoute.js"; // Use a unique name
// import itemsRoute from "./Routes/itemsRoute.js"; // Use a unique name


// import jwt from "jsonwebtoken";

// dotenv.config(); // Ensure this line is present

// const app = express();

// // Updated CORS configuration
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow frontend domain
//     credentials: true, // Allow cookies & authentication
//     methods: ["GET", "POST", "DELETE", "PUT"], // Allowed methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
//   })
// );

// app.use(express.json());
// app.set("db", db);
// // Check database connection
// db.getConnection((err) => {
//   if (err) {
//     console.error("Error connecting to database:", err);
//   } else {
//     console.log("Connected to database");
//   }
// });

// // Use the routes with correct prefixes

// app.use("/api/auth", authRoute);
// app.use("/api/items", itemsRoute); // Correct naming

// app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });

// export default app;







import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import authRoute from "./Routes/authRoute.js"; // Use a unique name
//import staffroute
// import staffroute from "./Routes/staffroute.js"; // Use a unique name
import itemsRoute from "./Routes/itemsRoute.js"; // Use a unique name


import jwt from "jsonwebtoken";

dotenv.config(); // Ensure this line is present

const app = express();

// Updated CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend domain
    credentials: true, // Allow cookies & authentication
    methods: ["GET", "POST", "DELETE", "PUT"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json());
app.set("db", db);
// Check database connection
db.getConnection((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

// Use the routes with correct prefixes

app.use("/api/auth", authRoute);
app.use("/api/items", itemsRoute); // Correct naming


// app.use("/api", requestRoutes);
// app.use("/api", departmentRoutes); 
//use staffroute
// app.use("/api/requests", staffroute); // Correct naming

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

export default app;





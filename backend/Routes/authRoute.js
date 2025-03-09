
// //import rigister from controllers folder
// import express from "express";
// import { register,login } from "../Controllers/authControllers.js";

// const router = express.Router();

// //register route
// router.post("/register", register);
// router.post("/login", login);
// // router.post("/login", login);
// export default router;
import express from "express";
import { register, login, logout,deleteUser,updateUser,fetchData } from "../Controllers/authControllers.js";
import { authenticate } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Fetch data route
router.get("/fetchData", fetchData);

//delete route 
//

//route by email
router.delete("/deleteUser/:id", authenticate, deleteUser);

//update route
router.put("/updateUser/:email", authenticate, updateUser);
// Logout route
router.post("/logout", authenticate, logout);




export default router;
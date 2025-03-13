
// // //import rigister from controllers folder
// // import express from "express";
// // import { register,login } from "../Controllers/authControllers.js";

// // const router = express.Router();

// // //register route
// // router.post("/register", register);
// // router.post("/login", login);
// // // router.post("/login", login);
// // export default router;
// import express from "express";

// import { register, login, logout,deleteUser,updateUser,fetchData } from "../Controllers/authControllers.js";


// const router = express.Router();

// // Register route
// router.post("/register", register);

// // Login route
// router.post("/login", login);

// // Fetch data route
// router.get("/fetchData", fetchData);

// //delete route 
// //

// //route by email


// //update route
// router.put("/updateUser/:id", authenticate, updateUser);
// router.delete("/deleteUser/:email", authenticate, deleteUser);
// // Logout route
// router.post("/logout", authenticate, logout);




// export default router;
import express from "express";
// import { authenticate } from "../Middleware/authMiddleware.js";
import { register, login, fetchData,getUserById , updateUser, deleteUser, logout } from "../Controllers/authControllers.js";

const router = express.Router();

// Routes with /api/users base path assumed in main server file
router.post("/register", register);               // POST /api/users/register
router.post("/login", login);                     // POST /api/users/login
router.get("/fetchData", fetchData);              // GET /api/users/fetchData
router.get("/getUserById/:id", getUserById); // GET /api/users/fetchData/:id
router.post("/updateUser/:id", updateUser);       // PUT /api/users/updateUser/:id ✅ Matches frontend
router.delete("/deleteUser/:id", deleteUser);     // DELETE /api/users/deleteUser/:id
router.post("/logout", logout);                   // POST /api/users/logout

export default router;

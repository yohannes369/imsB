
//import rigister from controllers folder
import express from "express";
import { register,login } from "../Controllers/authControllers.js";

const router = express.Router();

//register route
router.post("/register", register);
router.post("/login", login);
// router.post("/login", login);
export default router;

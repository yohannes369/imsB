
//import rigister from controllers folder
import express from "express";
import { register, login } from "../Controllers/authControllers.js";
import express from "express";
const router = express.Router();

//register route
router.post("/register", register);
router.post("/login", login);
export default router;

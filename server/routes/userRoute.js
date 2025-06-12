import express from "express";
import { registerUser, loginUser, logoutUser } from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

export default router;

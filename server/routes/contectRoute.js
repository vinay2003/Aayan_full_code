import express from "express";
import { sendMessage, getAllMessages, deleteMessage } from "../controller/contectController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/", getAllMessages);
router.delete("/:id", isAuthenticated, deleteMessage);

export default router;

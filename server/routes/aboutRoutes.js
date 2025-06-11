import express from "express";
import { getAboutContent, updateAboutContent } from "../controllers/aboutController.js";

const router = express.Router();

router.get("/", getAboutContent);         // GET /api/about
router.post("/", updateAboutContent);     // POST /api/about

export default router;

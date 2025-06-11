// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import { cloudinary, initCloudinary } from "./config/cloudinary.js";
import { connectToDB } from "./config/db.js";

import sliderRoutes from './routes/sliderRoutes.js';
import contactRoutes from "./routes/contactRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import authRoutes from "./routes/auth.js";

// Setup __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Init Cloudinary
initCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use('/api/sliders', sliderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/auth", authRoutes);

// Get slider images
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find().sort("id");
    res.json(images);
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
(async () => {
  try {
    const db = await connectToDB();
    console.log("Connected to MongoDB");

    // Optional: insert sample doc
    const collectionName = process.env.COLLECTION_NAME || "default_collection";
    const collection = db.collection(collectionName);
    await collection.insertOne({ name: "Vinay Sharma", role: "Developer" });
    console.log(`Document inserted into: ${collectionName}`);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  }
})();

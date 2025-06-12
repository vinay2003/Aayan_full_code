import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/db.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import contactMessage from "./routes/contectRoute.js";
import userRoutes from "./routes/userRoute.js";
// import sliderRoutes from "./routes/sliderRoutes.js";
// import aboutRoutes from './routes/aboutRoutes.js';
// import serviceRoutes from './routes/serviceRoutes.js';
// import testimonialRoutes from './routes/testimonialRoutes.js';

const app = express();
dotenv.config();

// CORS configuration
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File Upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/send", contactMessage);
app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/slider", sliderRoutes);
// app.use("/api/v1/about", aboutRoutes);
// app.use("/api/v1/service", serviceRoutes);
// app.use("/api/v1/testimonial", testimonialRoutes);

// Connect DB
dbConnection();

// Error handler middleware (should be last)
app.use(errorMiddleware);

export default app;

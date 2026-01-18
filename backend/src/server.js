import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();

/* ===========================
   CORS CONFIG (FIXED & SAFE)
=========================== */

// Example ORIGIN:
// http://localhost:5173,https://dailytaskmanagerapp.netlify.app
const allowedOrigins = process.env.ORIGIN
  ? process.env.ORIGIN.split(",").map(o => o.trim())
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman, curl, server-side calls
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // IMPORTANT: do NOT throw error here
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ALWAYS allow preflight
app.options("*", cors());

/* ===========================
   MIDDLEWARES
=========================== */

app.use(express.json());
app.use(morgan("dev"));

/* ===========================
   HEALTH CHECK
=========================== */

app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "Vexocore Task Manager API",
    environment: process.env.NODE_ENV || "production",
  });
});

/* ===========================
   ROUTES
=========================== */

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

/* ===========================
   GLOBAL ERROR HANDLER
=========================== */

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    message: err.message || "Server error",
  });
});

/* ===========================
   SERVER + DATABASE
=========================== */

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 API listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

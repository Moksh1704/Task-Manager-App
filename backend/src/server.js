import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();

/* ===== CORS (FINAL, WORKING) ===== */
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.options("*", cors());

/* ===== MIDDLEWARES ===== */
app.use(express.json());
app.use(morgan("dev"));

/* ===== HEALTH CHECK ===== */
app.get("/", (req, res) => {
  res.json({ ok: true });
});

/* ===== ROUTES ===== */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

/* ===== ERROR HANDLER ===== */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

/* ===== DB + SERVER ===== */
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

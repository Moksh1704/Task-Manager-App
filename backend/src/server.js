import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

dotenv.config();

const app = express();

/* ===========================
   CORS CONFIG (PRODUCTION SAFE)
=========================== */

const allowedOrigins = process.env.ORIGIN
  ? process.env.ORIGIN.split(',').map(o => o.trim())
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server / postman / mobile apps
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

/* ===========================
   MIDDLEWARES
=========================== */

app.use(express.json());
app.use(morgan('dev'));

/* ===========================
   HEALTH CHECK
=========================== */

app.get('/', (req, res) => {
  res.json({
    ok: true,
    service: 'Vexocore Task Manager API',
    environment: process.env.NODE_ENV || 'development',
  });
});

/* ===========================
   ROUTES
=========================== */

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

/* ===========================
   GLOBAL ERROR HANDLER
=========================== */

app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

/* ===========================
   SERVER + DATABASE
=========================== */

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ Missing MONGO_URI in environment variables');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 API listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  });

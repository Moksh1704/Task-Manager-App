import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.ORIGIN?.split(',') || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ ok: true, service: 'Vexocore Task Manager API' }));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI');
  process.exit(1);
}

mongoose.connect(MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
}).catch((e) => {
  console.error('MongoDB connection error', e);
  process.exit(1);
});

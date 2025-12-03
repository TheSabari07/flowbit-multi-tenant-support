import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import screenRoutes from './routes/screenRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { requireAuth } from './middleware/auth.js';
import { requireAdmin } from './middleware/admin.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/me', screenRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/admin', requireAuth, requireAdmin, adminRoutes);

app.get('/', (req, res) => {
  res.send('Flowbit backend is up!');
});

export default app;

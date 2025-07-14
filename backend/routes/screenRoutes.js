import express from 'express';
import { getScreens } from '../controllers/screenController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/screens', requireAuth, getScreens);

export default router;

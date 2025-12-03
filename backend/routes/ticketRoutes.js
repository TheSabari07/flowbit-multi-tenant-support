import express from 'express';
import { createTicket, getTickets, webhookCallback } from '../controllers/ticketController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, getTickets);
router.post('/', requireAuth, createTicket);
router.post('/webhook/ticket-done', webhookCallback);

export default router;

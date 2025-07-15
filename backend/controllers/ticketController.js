import Ticket from '../models/Ticket.js';
import axios from 'axios';

const N8N_WEBHOOK_URL = 'http://n8n:5678/webhook/test-flow'; 

export const createTicket = async (req, res) => {
  const { title } = req.body;
  const { userId, customerId } = req.user;

  try {
    const ticket = await Ticket.create({ title, customerId, createdBy: userId });

    await axios.post(N8N_WEBHOOK_URL, {
      ticketId: ticket._id,
      customerId
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create ticket', err });
  }
};

export const webhookCallback = async (req, res) => {
  const { ticketId, status } = req.body;
  const secret = req.headers['x-flowbit-secret'];

  if (secret !== process.env.WEBHOOK_SECRET) {
    return res.status(403).json({ msg: 'Invalid webhook secret' });
  }

  try {
    await Ticket.findByIdAndUpdate(ticketId, { status: status || 'done' });
    res.json({ msg: 'Ticket updated successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Webhook processing failed', err });
  }
};

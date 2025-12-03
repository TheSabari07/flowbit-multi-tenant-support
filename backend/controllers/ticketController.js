import Ticket from '../models/Ticket.js';
import axios from 'axios';

export const createTicket = async (req, res) => {
  const { title } = req.body;
  const { userId, customerId } = req.user;

  console.log('User:', req.user);
  console.log('Body:', req.body);

  try {
    const ticket = await Ticket.create({ title, customerId, createdBy: userId });

    // Try to trigger n8n workflow if configured
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
    if (N8N_WEBHOOK_URL) {
      try {
        await axios.post(N8N_WEBHOOK_URL, {
          ticketId: ticket._id,
          customerId,
          title: ticket.title
        });
        console.log('n8n workflow triggered successfully');
      } catch (webhookError) {
        console.log('n8n webhook failed (continuing anyway):', webhookError.message);
      }
    } else {
      console.log('N8N_WEBHOOK_URL not configured - skipping workflow trigger');
    }

    res.status(201).json(ticket);
  } catch (err) {
    console.error('Ticket creation failed:', err);
    res.status(500).json({ msg: 'Failed to create ticket', error: err.message });
  }
};

export const getTickets = async (req, res) => {
  try {
    const { customerId } = req.user;
    
    // Only return tickets for the current tenant
    const tickets = await Ticket.find({ customerId })
      .populate('createdBy', 'email')
      .sort({ createdAt: -1 });
    
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch tickets', error: err.message });
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

import Ticket from '../models/Ticket.js';
import User from '../models/User.js';

export const getAllTickets = async (req, res) => {
  try {
    const { customerId } = req.user;
    
    // Only return tickets for the admin's tenant
    const tickets = await Ticket.find({ customerId })
      .populate('createdBy', 'email')
      .sort({ createdAt: -1 });
    
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch tickets', error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { customerId } = req.user;
    
    // Only return users for the admin's tenant
    const users = await User.find({ customerId })
      .select('-passwordHash')
      .sort({ createdAt: -1 });
    
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch users', error: err.message });
  }
}; 
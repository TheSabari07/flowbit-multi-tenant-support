import express from 'express';
import { getAllTickets, getAllUsers } from '../controllers/adminController.js';

const router = express.Router();

router.get('/tickets', getAllTickets);
router.get('/users', getAllUsers);

export default router; 
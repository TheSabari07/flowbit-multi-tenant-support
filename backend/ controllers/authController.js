import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  const { email, password, role, customerId } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, role, customerId });
    const token = generateToken({ userId: user._id, customerId, role });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Registration failed', err });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = generateToken({
      userId: user._id,
      customerId: user.customerId,
      role: user.role
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', err });
  }
};

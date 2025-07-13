import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
    customerId: { type: String, required: true }
});

export default mongoose.model('User', userSchema);
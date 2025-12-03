import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://admin:password@localhost:27017/flowbit?authSource=admin');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create admin users for each tenant
    const adminPassword = await bcrypt.hash('admin123', 10);

    const users = [
      {
        email: 'admin@logisticsco.com',
        passwordHash: adminPassword,
        role: 'Admin',
        customerId: 'LogisticsCo'
      },
      {
        email: 'admin@retailgmbh.com',
        passwordHash: adminPassword,
        role: 'Admin',
        customerId: 'RetailGmbH'
      },
      {
        email: 'user@logisticsco.com',
        passwordHash: adminPassword,
        role: 'User',
        customerId: 'LogisticsCo'
      },
      {
        email: 'user@retailgmbh.com',
        passwordHash: adminPassword,
        role: 'User',
        customerId: 'RetailGmbH'
      }
    ];

    await User.insertMany(users);
    console.log('Created seed users:');
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role}) - ${user.customerId}`);
    });

    console.log('\nSeed data created successfully!');
    console.log('\nLogin credentials:');
    console.log('LogisticsCo Admin: admin@logisticsco.com / admin123');
    console.log('RetailGmbH Admin: admin@retailgmbh.com / admin123');
    console.log('LogisticsCo User: user@logisticsco.com / admin123');
    console.log('RetailGmbH User: user@retailgmbh.com / admin123');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedData(); 
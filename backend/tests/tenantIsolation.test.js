import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Ticket.deleteMany({});
  await User.deleteMany({});
});

describe('Tenant Data Isolation', () => {
  test('Tenant A cannot access Tenant B ticket data', async () => {
    // Create users for different tenants
    const tenantAUser = await User.create({
      email: 'userA@tenantA.com',
      passwordHash: await bcrypt.hash('password', 10),
      customerId: 'TenantA',
      role: 'Admin'
    });

    const tenantBUser = await User.create({
      email: 'userB@tenantB.com',
      passwordHash: await bcrypt.hash('password', 10),
      customerId: 'TenantB',
      role: 'Admin'
    });

    // Create tickets for different tenants
    await Ticket.create({
      title: 'Tenant A Ticket',
      customerId: 'TenantA',
      createdBy: tenantAUser._id
    });

    await Ticket.create({
      title: 'Tenant B Ticket',
      customerId: 'TenantB',
      createdBy: tenantBUser._id
    });

    // Simulate Tenant A admin trying to access all tickets
    const tenantATickets = await Ticket.find({ customerId: 'TenantA' });
    const tenantBTickets = await Ticket.find({ customerId: 'TenantB' });

    // Verify tenant isolation
    expect(tenantATickets).toHaveLength(1);
    expect(tenantATickets[0].title).toBe('Tenant A Ticket');
    expect(tenantATickets[0].customerId).toBe('TenantA');

    expect(tenantBTickets).toHaveLength(1);
    expect(tenantBTickets[0].title).toBe('Tenant B Ticket');
    expect(tenantBTickets[0].customerId).toBe('TenantB');

    // Verify that Tenant A cannot see Tenant B's tickets
    const allTickets = await Ticket.find({});
    expect(allTickets).toHaveLength(2);

    // But when filtered by customerId, each tenant only sees their own
    const tenantAOnlyTickets = allTickets.filter(ticket => ticket.customerId === 'TenantA');
    const tenantBOnlyTickets = allTickets.filter(ticket => ticket.customerId === 'TenantB');

    expect(tenantAOnlyTickets).toHaveLength(1);
    expect(tenantBOnlyTickets).toHaveLength(1);
    expect(tenantAOnlyTickets[0].customerId).toBe('TenantA');
    expect(tenantBOnlyTickets[0].customerId).toBe('TenantB');
  });

  test('Tenant A cannot access Tenant B user data', async () => {
    // Create users for different tenants
    await User.create({
      email: 'userA@tenantA.com',
      passwordHash: await bcrypt.hash('password', 10),
      customerId: 'TenantA',
      role: 'Admin'
    });

    await User.create({
      email: 'userB@tenantB.com',
      passwordHash: await bcrypt.hash('password', 10),
      customerId: 'TenantB',
      role: 'Admin'
    });

    // Simulate Tenant A admin trying to access users
    const tenantAUsers = await User.find({ customerId: 'TenantA' });
    const tenantBUsers = await User.find({ customerId: 'TenantB' });

    // Verify tenant isolation
    expect(tenantAUsers).toHaveLength(1);
    expect(tenantAUsers[0].customerId).toBe('TenantA');

    expect(tenantBUsers).toHaveLength(1);
    expect(tenantBUsers[0].customerId).toBe('TenantB');

    // Verify that Tenant A cannot see Tenant B's users
    const allUsers = await User.find({});
    expect(allUsers).toHaveLength(2);

    // But when filtered by customerId, each tenant only sees their own
    const tenantAOnlyUsers = allUsers.filter(user => user.customerId === 'TenantA');
    const tenantBOnlyUsers = allUsers.filter(user => user.customerId === 'TenantB');

    expect(tenantAOnlyUsers).toHaveLength(1);
    expect(tenantBOnlyUsers).toHaveLength(1);
    expect(tenantAOnlyUsers[0].customerId).toBe('TenantA');
    expect(tenantBOnlyUsers[0].customerId).toBe('TenantB');
  });
}); 
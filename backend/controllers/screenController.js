import fs from 'fs';
import path from 'path';

const registryPath = path.resolve('registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

export const getScreens = (req, res) => {
  const { customerId } = req.user;

  const screens = registry[customerId];
  if (!screens) return res.status(404).json({ msg: 'No screens found for tenant' });

  res.json({ screens });
};


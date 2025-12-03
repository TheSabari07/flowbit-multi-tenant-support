import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const registryPath = path.join(__dirname, '..', 'registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

export const getScreens = (req, res) => {
  const { customerId } = req.user;

  // Find screens for the current tenant
  const tenantScreens = registry
    .filter(entry => entry.tenant === customerId)
    .map(entry => entry.screenUrl.replace('/', '')); // Remove leading slash

  if (!tenantScreens.length) {
    return res.status(404).json({ msg: 'No screens found for tenant' });
  }

  res.json({ screens: tenantScreens });
};

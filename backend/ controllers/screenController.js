import registry from '../registry.json' assert { type: 'json' };

export const getScreens = (req, res) => {
  const { customerId } = req.user;

  const screens = registry[customerId];
  if (!screens) return res.status(404).json({ msg: 'No screens found for tenant' });

  res.json({ screens });
};

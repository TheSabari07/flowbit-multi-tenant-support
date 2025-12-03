export const isLoggedIn = () => !!localStorage.getItem('token');

export const login = (token) => {
  localStorage.setItem('token', token);
  
  // Decode JWT to get user info (this is a simple decode, in production you'd want proper JWT validation)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem('userEmail', payload.email || 'User');
    localStorage.setItem('userRole', payload.role || 'User');
    localStorage.setItem('customerId', payload.customerId || '');
  } catch (error) {
    console.error('Failed to decode token:', error);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
  localStorage.removeItem('customerId');
};
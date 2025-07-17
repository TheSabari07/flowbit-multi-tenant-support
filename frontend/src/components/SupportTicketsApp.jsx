import { useState } from 'react';
import API from '../services/api';

const SupportTicketsApp = () => {
  const [title, setTitle] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/tickets', { title });
      setSuccess('Ticket created!');
      setTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4 font-bold">Support Tickets</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      {success && <p className="text-green-600">{success}</p>}
    </div>
  );
};

export default SupportTicketsApp;

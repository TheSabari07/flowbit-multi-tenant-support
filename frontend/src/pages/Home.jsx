import { useEffect, useState } from 'react';
import API from '../services/api';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [screens, setScreens] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const res = await API.get('/me/screens');
        setScreens(res.data.screens);
        setSelected(res.data.screens[0]); 
      } catch (err) {
        console.error('Failed to load screens', err);
      }
    };

    fetchScreens();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar screens={screens} selected={selected} onSelect={setSelected} />
      <div className="flex-1 p-4 overflow-y-auto">
        {selected === 'support' && <SupportTicketsApp />}
      </div>
    </div>
  );
};

export default Home;

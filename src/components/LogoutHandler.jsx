import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await api.post('/logout', {}, { withCredentials: true });

        localStorage.removeItem('token');
        navigate('/login'); // redirect to login
      } catch (error) {
        console.error('Logout failed:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="text-center py-10 text-gray-700 text-xl">
      Logging out...
    </div>
  );
}

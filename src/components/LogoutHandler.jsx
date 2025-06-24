import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Send logout request to your Laravel Sanctum logout route
        await api.post('/logout');

        // Clear token and redirect to guest page or login
        localStorage.removeItem('token');
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
        localStorage.removeItem('token'); // still remove it on failure
        navigate('/');
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

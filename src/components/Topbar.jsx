import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Topbar() {

  const image = {
    url: './public/image/hihi.png',
    height: 20,
    width: 50
  }

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔁 Check login status whenever the route changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  // ✅ Handle logout and update state
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/logout'); // redirect to logout route
  };

  return (
    <div className="flex justify-between items-center p-3 bg-slate-800 text-white">
      <div className="flex justify-start">
        <img src={image.url} alt="logo image" height={image.height} width={image.width} />
        <h3 className="text-3xl font-bold mt-5">Task Manager</h3>

      </div>
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="text-white border border-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-white hover:text-gray-800"
        >
          Logout
        </button>
      ) : (
        location.pathname !== '/login' && (
          <button
            onClick={() => navigate('/login')}
            className="text-white border border-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-white hover:text-gray-800"
          >
            Login
          </button>
        )
      )}
    </div>
  );
}

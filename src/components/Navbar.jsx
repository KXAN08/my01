import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const API = 'https://nt-shopping-list.onrender.com/api';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API}/auth/me`, { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.error('Foydalanuvchini olishda xatolik:', err.response?.data || err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error('Logout xatolik:', err.response?.data || err);
      alert('Chiqishda xatolik!');
    }
  };

  return (
    <nav className="flex items-center justify-between bg-white shadow px-6 py-3">
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
        <img src="/img/logo.png" alt="Logo" className="w-10 h-10 mr-3" />
        <h1 className="text-2xl font-bold">Shopping List</h1>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">@{user.username}</p>
          </div>
          <div className="bg-indigo-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
            {user.name?.[0] || user.username?.[0]}
          </div>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline text-sm ml-4"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

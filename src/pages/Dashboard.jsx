import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProfileCard from '../components/ProfileCard';
import GroupModal from '../components/GroupModal';
import GroupDetails from '../components/GroupDetails';
import { fetchGroups } from '../api/groupApi';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [authError, setAuthError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return setAuthError(true);

      try {
        const res = await axios.get('https://nt-shopping-list.onrender.com/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        setAuthError(false);
      } catch (err) {
        console.error(' Token noto‘g‘ri yoki muddati tugagan');
        setAuthError(true);
      }
    };

    fetchUser();
    fetchGroups().then(setGroups).catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleGroupCreated = () => {
    setShowModal(false);
    window.location.reload(); 
  };

  if (authError) {
    return (
      <div className="p-6 text-center text-red-500">
         Avtorizatsiya xatosi. Iltimos, <a href="/login" className="text-blue-600 underline">qaytadan kiring</a>.
      </div>
    );
  }

  if (!user) {
    return <p className="p-6">Yuklanmoqda...</p>;
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          user={user}
          groups={groups}
          onSelectGroup={setSelectedGroup}
          onCreateGroup={() => setShowModal(true)}
        />
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <ProfileCard user={user} onEdit={() => {}} onDelete={() => {}} />
          {selectedGroup && <GroupDetails groupId={selectedGroup} />}
        </main>
      </div>
      {showModal && (
        <GroupModal
          onClose={() => setShowModal(false)}
          onCreated={handleGroupCreated}
        />
      )}
    </div>
  );
};

export default Dashboard;

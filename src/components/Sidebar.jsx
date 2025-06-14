import { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = ({ user, onSelectGroup, onCreateGroup }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://nt-shopping-list.onrender.com/api/groups', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGroups(res.data);
      } catch (err) {
        console.error('Gruppalarni olishda xatolik:', err.response?.data || err);
      }
    };
    loadGroups();
  }, []);

  return (
    <aside className="w-64 bg-gray-50 border-r p-4 flex flex-col gap-6">
      <div>
        <div className="bg-indigo-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
          {user.name?.[0] || user.username?.[0]}
        </div>
        <h3 className="mt-2 font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-600">@{user.username}</p>
      </div>

      <button
        onClick={onCreateGroup}
        className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700"
      >
        + Create Group
      </button>

      <div>
        <h4 className="font-medium mb-2">Groups</h4>
        {groups.map(group => (
          <button
            key={group._id}
            onClick={() => onSelectGroup(group._id)}
            className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
          >
            {group.name}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

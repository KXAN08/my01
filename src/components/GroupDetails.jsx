import { useEffect, useState } from 'react';
import axios from 'axios';
import GroupItems from './GroupItems';

const API = 'https://nt-shopping-list.onrender.com/api';

const GroupDetails = ({ groupId }) => {
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [joined, setJoined] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const token = localStorage.getItem('token');
        const groupRes = await axios.get(`${API}/groups/${groupId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGroup(groupRes.data);

        const membersRes = await axios.get(`${API}/groups/${groupId}/members`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMembers(membersRes.data);

        const isJoined = membersRes.data.some(m => m._id === groupRes.data.currentUserId);
        setJoined(isJoined);
      } catch (err) {
        console.error('Group details error:', err.response?.data || err);
      }
    };
    fetchGroupData();
  }, [groupId]);

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API}/groups/${groupId}/join`, { password: passwordInput }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJoined(true);
      alert('Guruhga qo‘shildingiz!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Join xatolik');
    }
  };

  const handleLeave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API}/groups/${groupId}/leave`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJoined(false);
      alert('Guruhdan chiqdingiz!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Leave xatolik');
    }
  };

  if (!group) return <p>⏳ Yuklanmoqda...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{group.name}</h2>
      <div className="mb-4">
        <strong>A'zolar:</strong>
        <ul className="list-disc pl-6">
          {members.map(m => (
            <li key={m._id}>{m.name || m.username}</li>
          ))}
        </ul>
      </div>

      {!joined && (
        <div className="mb-4">
          <input
            type="password"
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
            placeholder="Guruh paroli"
            className="border p-2 rounded w-full"
          />
        </div>
      )}

      <div className="flex gap-4">
        {joined ? (
          <button onClick={handleLeave} className="bg-red-500 text-white px-4 py-2 rounded">
            Leave Group
          </button>
        ) : (
          <button onClick={handleJoin} className="bg-blue-600 text-white px-4 py-2 rounded">
            Join Group
          </button>
        )}
      </div>

      {joined && <GroupItems groupId={groupId} />}
    </div>
  );
};

export default GroupDetails;
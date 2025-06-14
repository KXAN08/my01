import axios from 'axios';
import { useState } from 'react';

const GroupModal = ({ onClose, onCreated }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://nt-shopping-list.onrender.com/api/groups', { name, password }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onCreated();
      onClose();
    } catch (err) {
      alert(err.response?.data?.msg || 'Group yaratishda xatolik');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-4">Create New Group</h3>
        <input type="text" placeholder="Group Name" className="w-full mb-3 p-2 border rounded" value={name} onChange={e => setName(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="flex justify-end gap-2">
          <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
          <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default GroupModal;


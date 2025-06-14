import { useEffect, useState } from 'react';
import axios from 'axios';

const GroupItems = ({ groupId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://nt-shopping-list.onrender.com/api/groups/${groupId}/items`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setItems(res.data);
      } catch (err) {
        console.error('Itemlarni olishda xatolik:', err.response?.data || err);
      }
    };
    fetchItems();
  }, [groupId]);

  if (!items.length) return <p>❗ Mahsulotlar yo‘q yoki yuklanmoqda...</p>;

  return (
    <div>
      <h4 className="font-semibold text-lg mb-2">Items</h4>
      <ul className="list-disc pl-6">
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupItems;


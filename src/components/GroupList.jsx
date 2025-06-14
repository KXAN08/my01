const GroupList = ({ groups, onSelectGroup }) => {
  return (
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
  );
};

export default GroupList;

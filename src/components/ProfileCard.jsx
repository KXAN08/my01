import React from 'react';

const ProfileCard = ({ user = {}, onEdit, onDelete }) => {
  const fullName = `${user.name || 'Foydalanuvchi'} ${user.surname || ''}`;
  const username = user.username || 'username';

  return (
    <div className="bg-white rounded shadow p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-indigo-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
          {(user.name || username)[0]?.toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{fullName}</h2>
          <p className="text-gray-600">@{username}</p>
        </div>
      </div>
      {(onEdit || onDelete) && (
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;

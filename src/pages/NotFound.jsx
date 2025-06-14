import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-800 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-8">404 | Page Not Found</h1>

      {token && (
        <div className="space-x-8">
          <Link 
            to="/developers" 
            className="bg-cyan-600 text-white px-6 py-3 rounded hover:bg-cyan-700 transition"
          >
            Developers
          </Link>
          <Link 
            to="/posts" 
            className="bg-cyan-600 text-white px-6 py-3 rounded hover:bg-cyan-700 transition"
          >
            Posts
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotFound;

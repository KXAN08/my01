import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://nt-shopping-list.onrender.com/api/users', {
        name,
        username,
        password,
      });

      localStorage.setItem('token', res.data.token); 
      alert('Ro‘yxatdan o‘tish muvaffaqiyatli!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Xatolik:', err.response?.data);
      alert(err.response?.data?.msg || 'Xatolik yuz berdi');
    }
  };

  return (
    <div className="flex h-screen bg-[#6b7280] items-center justify-center px-4">
      <div className="flex w-[1100px] h-[600px] rounded-2xl overflow-hidden shadow-xl">
        <div className="w-1/2 bg-[#1e1e1e] text-white flex flex-col justify-center items-center p-12">
          <img src="/img/logo.png" alt="Logo" className="w-28 h-28 mb-6" />
          <p className="text-lg text-gray-400 mb-2">Welcome to</p>
          <h2 className="text-5xl font-light tracking-tight">Shopping List</h2>
        </div>

        <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Sign Up</h1>
          <p className="text-lg text-gray-500 mb-6">Create Your Account</p>

          <form onSubmit={handleRegister} className="flex flex-col w-full max-w-md">
            <label className="text-base mb-1 font-medium">Name</label>
            <input
              type="text"
              placeholder="Eshmatjon"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-3 mb-4 rounded-md text-black text-base"
              required
            />

            <label className="text-base mb-1 font-medium">Username</label>
            <input
              type="text"
              placeholder="eshmatjon123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 p-3 mb-4 rounded-md text-black text-base"
              required
            />

            <label className="text-base mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 mb-6 rounded-md text-black text-base"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-all font-semibold text-base"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

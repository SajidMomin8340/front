import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-12 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-4xl font-bold mb-8 text-center">Login</h2>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700 font-bold text-lg">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label className="block mb-2 text-gray-700 font-bold text-lg">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 w-full rounded font-bold text-lg hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

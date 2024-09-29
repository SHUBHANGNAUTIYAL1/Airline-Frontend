import React, { useState } from 'react';
import axios from 'axios';
import flightpic from "../assets/flight.jpg";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  localStorage.clear();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8100/api/auth/login', formData);
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log(response);
      
      toast.success('Login Successful!');
      
      if (response.data.role === "airline") {
        navigate('/flight');
      } else {
        navigate("/home");
      }
    } catch (error) {
      toast.error('Invalid credentials! Please try again.');
      console.error('Error logging in:', error);
      
      // Show error toast
      
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center animation-backgroundAnimation relative"
      style={{ backgroundSize: 'cover', backgroundImage: `url(${flightpic})` }}
    >
      <div className="bg-black bg-opacity-80 p-10 rounded-xl shadow-xl">
        <h1 className="leading-[72px] space-grotesk text-[70px] text-center text-white mb-4">GET IN TOUCH</h1>
        
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Mail"
            value={formData.email}
            maxLength={20}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-white outline-none text-white bg-black placeholder-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            maxLength={20}
            required
            className="w-full px-4 py-2 outline-none border-2 border-white text-white bg-black placeholder-white"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-white outline-none text-white bg-black placeholder-white"
          >
            <option value="" disabled>Select Role</option>
            <option value="customer">Customer</option>
            <option value="airline">Airline</option>
          </select>
          <button
            type="submit"
            className="py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-[16px] text-center text-white">
          New User? <a href="/register" className="text-blue-300 underline">Sign Up</a>
        </p>
      </div>
      
      {/* Toast Container for showing the toasts */}
      <ToastContainer />
    </div>
  );
};

export default Login;

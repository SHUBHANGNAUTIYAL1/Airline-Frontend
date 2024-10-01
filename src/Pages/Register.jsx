import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import flightpic from '../assets/flight.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    let tempErrors = {};

    // Name validation
    if (!formData.name) {
      valid = false;
      tempErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      valid = false;
      tempErrors.email = 'Please enter a valid email';
    }

    // Password validation (must contain alphanumeric characters and a symbol)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      valid = false;
      tempErrors.password =
        'Password must be at least 8 characters, contain letters, numbers, and a special symbol';
    }

    // Role validation
    if (!formData.role) {
      valid = false;
      tempErrors.role = 'Please select a role';
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      const response = await axios.post('https://airline-backend.onrender.com/api/auth/register', formData);
      toast.success('Successfully registered!');
      console.log(response.data);
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      toast.error('Error registering user. Please try again.');
      console.error('Error registering user:', error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center animation-backgroundAnimation"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${flightpic})`,
      }}
    >
      <ToastContainer />
      <div className="bg-black bg-opacity-80 p-10 rounded-xl shadow-xl">
        <h1 className="leading-[72px] space-grotesk text-[70px] text-center text-white mb-4">
          GET IN TOUCH
        </h1>

        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            maxLength={20}
            required
            onChange={handleChange}
            className={`w-full px-4 py-2 outline-none border-2 ${errors.name ? 'border-red-500' : 'border-white'} bg-black text-white placeholder-white`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            maxLength={20}
            required
            onChange={handleChange}
            className={`w-full px-4 py-2 border-2 ${errors.email ? 'border-red-500' : 'border-white'} outline-none text-white bg-black placeholder-white`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            maxLength={20}
            min={5}
            required
            onChange={handleChange}
            className={`w-full px-4 py-2 outline-none border-2 ${errors.password ? 'border-red-500' : 'border-white'} text-white bg-black bg-transparent placeholder-white`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <select
            name="role"
            value={formData.role}
            required
            onChange={handleChange}
            className={`w-full px-4 py-2 border-2 ${errors.role ? 'border-red-500' : 'border-white'} outline-none text-white bg-black`}
          >
            <option value="" disabled>Select Role</option>
            <option value="customer">Customer</option>
            <option value="airline">Airline</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

          <button
            type="submit"
            className="py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-[16px] text-center text-white">
          Already a member? <a href="/" className="text-blue-300 underline">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

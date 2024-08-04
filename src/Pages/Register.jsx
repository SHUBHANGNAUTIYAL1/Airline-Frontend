import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    role:'',
  });
  const navigate=useNavigate()

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
      console.log(formData)
      const response = await axios.post('http://localhost:8100/api/auth/register', formData);
      console.log(response.data);
      navigate("/")
      // Optionally, handle the response, such as showing a success message or redirecting the user
    } catch (error) {
      console.error('Error registering user:', error);
      // Optionally, handle the error, such as showing an error message
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center animation-backgroundAnimation"
      style={{ backgroundSize: 'cover',
         backgroundImage: 'url("https://wallpapercave.com/wp/wp9004260.jpg")'
       }}
    >
      <div className="bg-black  bg-opacity-80 p-10 rounded-xl shadow-xl">
        <h1 className="leading-[72px] space-grotesk text-[70px] text-center text-white mb-4">GET IN TOUCH</h1>
      
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 outline-none border-2 border-white bg-black text-white placeholder-white "
          />
          <input
            type="email"
            name="email"
            placeholder="Mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-white outline-none text-white bg-black placeholder-white "
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 outline-none border-2 border-white text-white bg-black placeholder-white "
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-white outline-none text-white bg-black placeholder-white "
          >
            <option value="" disabled>Select Role</option>
            <option value="customer">Customer</option>
            <option value="airline">Airline</option>
            
          </select>
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

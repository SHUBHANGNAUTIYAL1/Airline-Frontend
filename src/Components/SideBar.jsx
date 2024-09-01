import React from "react";
import { FaPlane, FaHotel, FaClipboardList, FaRegUserCircle, FaInfoCircle, FaHeadset ,FaSignOutAlt } from "react-icons/fa";
import { GiAirplaneDeparture } from 'react-icons/gi';
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate=useNavigate()
  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col">
      <div className="text-2xl font-bold py-4 mb-10 text-center flex border-b gap-2 items-center justify-center space-x-2">
        <GiAirplaneDeparture className="text-blue-500 text-3xl" />
        <span className="text-3xl text-teal-600">Fly<span className="text-yellow-500">Mate</span></span>
      </div>
      <nav className="flex-grow p-6">
        <ul className="space-y-4">
          <li onClick={()=>navigate('/home')} className="flex items-center space-x-3 text-gray-600 border-b pb-2 hover:text-blue-500 hover:border-blue-500 transition duration-300">
            <FaPlane />
            <span>Flights</span>
          </li>
           
          <li onClick={()=>navigate('/hotels')} className="flex items-center space-x-3 text-gray-600 border-b pb-2 hover:text-blue-500 hover:border-blue-500 transition duration-300">
          
            <FaHotel />
            <span>Hotels</span>
            </li>
          
          
          <li onClick={()=>navigate('/booking')} className="flex items-center space-x-3 text-gray-600 border-b pb-2 hover:text-blue-500 hover:border-blue-500 transition duration-300">
            <FaClipboardList />
            <span>Your Bookings</span>
          </li>
          <li onClick={()=>navigate('/survey')} className="flex items-center space-x-3 text-gray-600 border-b pb-2 hover:text-blue-500 hover:border-blue-500 transition duration-300">
            <FaRegUserCircle />
            <span>Survey</span>
          </li>
          <li onClick={()=>navigate('/about')} className="flex items-center space-x-3 text-gray-600 border-b pb-2 hover:text-blue-500 hover:border-blue-500 transition duration-300">
            <FaInfoCircle />
            <span>About Us</span>
          </li>
          <li onClick={()=>navigate('/')} className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-md">
            <FaSignOutAlt className="text-gray-700 text-xl" />
            <span className="text-gray-700">Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

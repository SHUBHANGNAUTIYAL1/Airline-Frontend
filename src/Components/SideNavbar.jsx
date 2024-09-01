import React from 'react';
import { FaHome, FaClipboard, FaBookmark, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { GiAirplaneDeparture } from 'react-icons/gi'; // Add this import for the airplane icon
import { useNavigate } from 'react-router-dom';

// Example usage
const SideNavbar = () => {
  const navigate=useNavigate();
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-lg p-5">
        <div className="text-2xl font-bold mb-10 text-center flex gap-2 items-center justify-center space-x-2">
          <GiAirplaneDeparture className="text-blue-500 text-3xl" /> {/* Airplane icon */}
          <span className="text-3xl text-teal-600 ">Fly<span className='text-yellow-500'>Mate</span></span>
        </div>
        <ul className="space-y-4 mt-20">
          <li onClick={()=>navigate('/')} className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-md">
            <FaHome className="text-gray-700 text-xl" />
            <span className="text-gray-700">Home</span>
          </li>
          <li onClick={()=>navigate('/flight')} className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-md">
            <FaClipboard className="text-gray-700 text-xl" />
            <span className="text-gray-700">Flights</span>
          </li>
          <li onClick={()=>navigate('/customers')}className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-md">
            <FaBookmark className="text-gray-700 text-xl" />
            <span className="text-gray-700">Customers Bookings</span>
          </li>
          <li className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-md">
            <FaUser className="text-gray-700 text-xl" />
            <span className="text-gray-700">Profile</span>
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

export default SideNavbar;

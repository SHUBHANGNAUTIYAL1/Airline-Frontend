import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/SideBar';
import SideNavbar from '../Components/SideNavbar';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Include Sidebar */}
      <SideNavbar/>

      <div className="flex flex-col items-center justify-center w-full p-6">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Profile Overview</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* User Info Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Personal Information</h2>
              <div className="text-gray-600 space-y-2">
                <p><strong>Name:</strong> {user.name || 'Name not available'}</p>
                <p><strong>Email:</strong> {user.email || 'Email not available'}</p>
              </div>
            </div>

            {/* Additional Info Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Account Details</h2>
              <div className="text-gray-600 space-y-2">
                <p><strong>Member since:</strong> {user.memberSince || 'Date not available'}</p>
                <p><strong>Status:</strong> {user.status || 'Active'}</p>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="mt-8">
            <button
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => alert('Edit profile feature coming soon!')}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

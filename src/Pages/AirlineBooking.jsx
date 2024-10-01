import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/SideBar';
import SideNavbar from '../Components/SideNavbar';

const AirlineBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      // Replace with the actual airline ID or fetch it from context/local storage
      const airlineId = JSON.parse(localStorage.getItem('user'))._id;
      
      try {
        const response = await axios.get(`https://airline-backend.onrender.com/api/booking/airline/${airlineId}`);
        setBookings(response.data);
      } catch (err) {
        setError('Error fetching bookings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

 

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavbar />

      <div className="flex w-full flex-col p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Airline Bookings</h1>
        
        {bookings.length > 0 && (
          <div className="flex flex-col gap-8">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{booking.flightName}</h2>
                  <span className="text-sm text-gray-500">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                </div>

                <div className="text-gray-700 space-y-2">
                  <p><strong>Customer Id:</strong> {booking.user}</p>
                  <p><strong>From:</strong> {booking.from}</p>
                  <p><strong>To:</strong> {booking.to}</p>
                  <p><strong>Time:</strong> {booking.time}</p>
                  <p><strong>Travellers:</strong> {booking.bookingTravellers}</p>
                  <p><strong>Category:</strong> {booking.category}</p>
                  <p><strong>Price:</strong> ₹{booking.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AirlineBooking;

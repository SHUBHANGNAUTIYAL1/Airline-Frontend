import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/SideBar';
import BoardingPass from '../Components/BoardingPass'; // Import the BoardingPass component

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null); // State to track selected booking

  useEffect(() => {
    const fetchBookings = async () => {
      const user = JSON.parse(localStorage.getItem('user'))._id;

      if (!user) {
        setError('User ID not found in local storage.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8100/api/booking/user/${user}`);
        console.log(response.data)
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
      <Sidebar />

      <div className="flex w-full flex-col p-8 h-screen overflow-y-scroll">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{booking.flightName}</h2>
                  <span className="text-sm text-gray-500">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                </div>

                <div className="text-gray-700 flex justify-between items-center space-x-4">
                  <div className="space-y-2">
                    <p><strong>From:</strong> {booking.from}</p>
                    <p><strong>To:</strong> {booking.to}</p>
                    <p><strong>Airline:</strong> {booking.airline}</p>
                    <p><strong>Time:</strong> {booking.time}</p>
                    <p><strong>Travellers:</strong> {booking.bookingTravellers}</p>
                   
                  </div>
                  
                  <div className="text-right space-y-4">
                    <p className="text-lg font-bold text-green-600"><strong>Price:</strong> ₹{booking.totalPrice}</p>
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      View Boarding Pass
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedBooking && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg p-4">
              <button
                className="absolute top-2 right-2 text-black font-bold"
                onClick={() => setSelectedBooking(null)}
              >
                X
              </button>
              <BoardingPass booking={selectedBooking} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;

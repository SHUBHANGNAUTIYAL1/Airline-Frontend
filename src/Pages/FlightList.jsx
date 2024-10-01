import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightForm from '../Components/FlightForm'; // Corrected import path
import SideNavbar from '../Components/SideNavbar';

const FlightsList = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
  const [flights, setFlights] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch all flights created by airlines
    axios.get(`https://airline-backend.onrender.com/api/flight/get/${userId}`)
      .then(response => setFlights(response.data))
      .catch(error => console.error(error));
  }, [userId]);

  return (
    <div className='flex'>
      <SideNavbar />

      <div className="flex-1 p-6 bg-gray-100 overflow-y-scroll h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Airline Flights</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            {showForm ? 'Hide Form' : 'Create Flight'}
          </button>
        </div>

        {showForm && <FlightForm />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flights.map(flight => (
            <div key={flight._id} className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white transform hover:scale-105 transition-transform duration-300">
              {flight.image && <img src={flight.image} alt={flight.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />}
              <h2 className="text-xl font-bold text-gray-800 mb-2">{flight.name}</h2>
              <p className="text-gray-600 mb-1"><strong>Flight Number:</strong> {flight.flightNumber}</p>
              <p className="text-gray-600 mb-1"><strong>Airline:</strong> {flight.airline}</p>
              <p className="text-gray-600 mb-1"><strong>From:</strong> {flight.from}</p>
              <p className="text-gray-600 mb-1"><strong>To:</strong> {flight.to}</p>
              <p className="text-gray-600 mb-1"><strong>Departure:</strong> {flight.departureTime}</p>
              <p className="text-gray-600 mb-1"><strong>Arrival:</strong> {flight.arrivalTime}</p>
              <p className="text-gray-600 mb-1"><strong>Price:</strong> ${flight.price}</p>
              <p className="text-gray-600 mb-1"><strong>Available Seats:</strong> {flight.availableSeats}</p>
              <p className="text-gray-600 mb-1"><strong>Class Type:</strong> {flight.classType}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightsList;

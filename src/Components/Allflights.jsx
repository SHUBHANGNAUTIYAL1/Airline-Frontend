import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './SideBar';

const Allflights = () => {
  const location = useLocation();
  const flights = location.state?.flights || [];

  return (

    <div className='h-screen w-full flex'>
     <Sidebar/>
    <div className="w-full bg-white p-6 rounded-lg shadow-md overflow-y-scroll">
      <h2 className="text-xl font-bold mb-4">Available Flights</h2>
      {flights.length > 0 ? (
        flights.map((flight, index) => (
          <div key={index} className="border-b py-4">
            <h3 className="text-lg font-semibold">{flight.from} to {flight.to}</h3>
            <p>Departure: {flight.departureDate}</p>
            <p>Travellers: {flight.travellers}</p>
            <p>Class: {flight.travelClass}</p>
            <p>Price: ${flight.price}</p>
          </div>
        ))
      ) : (
        <p>No flights available for the selected criteria.</p>
      )}
    </div>
    </div>
  );
};

export default Allflights;

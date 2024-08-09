import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlightListing = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch flights from the backend when the component mounts
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:8100/api/flight/'); // Adjust the URL as needed
        setFlights(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching flight data');
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) {
    return <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100  flex flex-col w-full rounded-xl items-center space-y-4">
        
      {flights.map((flight, index) => (
        <div key={index} className="bg-white  w-full  rounded-lg shadow-md  px-10 py-4 flex overflow-hidden">
          {/* Image Section */}
          <div className="w-1/3 flex items-center">
            <img src={flight.image} alt={flight.airline} className="h-[200px] w-[300px] rounded-xl object-cover"/>
          </div>

          {/* Flight Details Section */}
          <div className="w-2/3 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{flight.airline}</h3>
                <p className="text-sm text-gray-500">{flight.flightNumber}</p>
              </div>
              <div className="text-right">
                <h4 className="text-xl font-semibold text-red-500">₹{flight.price}</h4>
                <p className="text-xs text-gray-500">Seats Available: {flight.availableSeats}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold">{flight.from} - {flight.to}</p>
              <p className="text-sm mt-2">{flight.departureTime} - {flight.arrivalTime}</p>
              <p className="text-xs text-gray-500 mt-1">{flight.classType}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow-md">
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightListing;

import React from "react";

const FlightCard = ({ flight, handleBookNow }) => {
  return (
    <div className="bg-white w-full rounded-lg shadow-md p-4 flex overflow-hidden">
      <div className="w-1/4 flex items-center">
        <img src={flight.image} alt={flight.airline} className="h-[120px] w-[180px] rounded-lg object-cover" />
      </div>
      <div className="w-3/4 pl-6 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h3 className="text-lg font-semibold">{flight.airline}</h3>
            <p className="text-sm text-gray-500">{flight.flightNumber}</p>
          </div>
          <div className="text-right">
            <h4 className="text-lg font-semibold text-red-500">${flight.price}</h4>
            <p className="text-xs text-gray-500">Seats Available: {flight.availableSeats}</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm font-semibold">{flight.from} - {flight.to}</p>
          <p className="text-xs mt-1">{flight.departureTime} - {flight.arrivalTime}</p>
          <p className="text-xs text-gray-500 mt-1">{flight.classType}</p>
        </div>
        <div className="mt-0 flex justify-end">
          <button onClick={() => handleBookNow(flight)} className="bg-orange-500 text-white px-4 py-1 rounded-lg shadow-md">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;

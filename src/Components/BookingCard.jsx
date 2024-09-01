import React from 'react';

const BookingCard = ({ booking }) => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-lg p-4 mb-6">
      {/* Image Section */}
      <div className="w-1/3">
        <img
          src={booking.image}
          alt={`${booking.flightName} flight`}
          className="rounded-lg object-cover w-full h-40"
        />
      </div>

      {/* Details Section */}
      <div className="flex-grow ml-6">
        <h2 className="text-2xl font-bold">{booking.flightName}</h2>
        <p className="text-gray-500">{booking.flightNumber}</p>
        <p className="font-semibold mt-2">{booking.from} - {booking.to}</p>
        <p className="text-gray-500">{booking.time}</p>
        <p className="text-gray-500">{booking.category}</p>
      </div>

      {/* Price and Booking Section */}
      <div className="flex flex-col items-end">
        <p className="text-2xl font-bold text-red-600">
          ₹{booking.price}
        </p>
        <p className="text-gray-500">Seats Available: {booking.availableSeats}</p>
        <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg">
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default BookingCard;

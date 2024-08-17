import React, { useState } from "react";
import axios from "axios";

const FlightSearch = () => {
  const [tripType, setTripType] = useState("one-way");
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Mumbai");
  const [departureDate, setDepartureDate] = useState("2024-08-09");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [flights, setFlights] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8100/api/flight/");
      const allFlights = response.data;

      console.log(response.data)

      const filteredFlights = allFlights.filter((flight) => {
        // Trim and compare the from, to, and classType values
        const matchesFrom = flight.from && flight.from.trim().toLowerCase() === from.trim().toLowerCase();
        const matchesTo = flight.to && flight.to.trim().toLowerCase() === to.trim().toLowerCase();
        const matchesClass = flight.classType && flight.classType.trim().toLowerCase() === travelClass.trim().toLowerCase();
  
        console.log(matchesFrom, matchesTo, matchesClass);
        return matchesFrom && matchesTo && matchesClass;
      });

      setFlights(filteredFlights);
      console.log("Filtered Flights:", filteredFlights);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  return (
    <div className="w-full ">
      <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Trip Type Selection */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-6">
            <button
              onClick={() => setTripType("one-way")}
              className={`font-semibold ${tripType === "one-way" ? "text-blue-500" : "text-gray-500"}`}
            >
              One Way
            </button>
            <button
              onClick={() => setTripType("round-trip")}
              className={`font-semibold ${tripType === "round-trip" ? "text-blue-500" : "text-gray-500"}`}
            >
              Round Trip
            </button>
            <button
              onClick={() => setTripType("multicity")}
              className={`font-semibold ${tripType === "multicity" ? "text-blue-500" : "text-gray-500"}`}
            >
              Multicity
            </button>
          </div>
          <div>
            <span className="text-gray-500 font-semibold">Search Lowest Price</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-4 gap-4 items-center">
          <div>
            <label className="block text-gray-500 font-semibold mb-1">FROM</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-blue-100 p-2 rounded-lg w-full"
            />
          </div>

          <div>
            <label className="block text-gray-500 font-semibold mb-1">TO</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-blue-100 p-2 rounded-lg w-full"
            />
          </div>

          <div>
            <label className="block text-gray-500 font-semibold mb-1">DEPARTURE DATE</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="bg-blue-100 p-2 rounded-lg w-full"
            />
          </div>

          {tripType === "round-trip" && (
            <div>
              <label className="block text-gray-500 font-semibold mb-1">RETURN DATE</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="bg-blue-100 p-2 rounded-lg w-full"
              />
            </div>
          )}
        </div>

        {/* Travellers & Class */}
        <div className="grid grid-cols-2 gap-4 mt-4 items-center">
          <div>
            <label className="block text-gray-500 font-semibold mb-1">TRAVELLER & CLASS</label>
            <div className="bg-blue-100 p-2 rounded-lg flex items-center justify-between">
              <select
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
                className="bg-transparent"
              >
                {[...Array(10).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1} Traveller(s)
                  </option>
                ))}
              </select>
              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="bg-transparent"
              >
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handleSearch}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold"
            >
              SEARCH
            </button>
            <button className="text-blue-500 font-semibold">Web Check-In</button>
          </div>
        </div>

        {/* Extra Options */}
        <div className="flex justify-center space-x-6 mt-4">
          <button className="text-blue-500 font-semibold">Defence Forces</button>
          <button className="text-blue-500 font-semibold">Students</button>
          <button className="text-blue-500 font-semibold">Senior Citizens</button>
          <button className="text-blue-500 font-semibold">Doctors Nurses</button>
        </div>

        {/* Displaying Flights */}
        {flights.length > 0 && (
  <div className="mt-4">
    <h2 className="text-gray-500 font-semibold mb-4">Available Flights</h2>
    <div className="space-y-4">
      {flights.map((flight, index) => (
        <div key={index} className="bg-white w-full rounded-lg shadow-md p-4 flex overflow-hidden">
          {/* Image Section */}
          <div className="w-1/4 flex items-center">
            <img src={flight.image} alt={flight.airline} className="h-[120px] w-[180px] rounded-lg object-cover" />
          </div>

          {/* Flight Details Section */}
          <div className="w-3/4 pl-6 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold">{flight.airline}</h3>
                <p className="text-sm text-gray-500">{flight.flightNumber}</p>
              </div>
              <div className="text-right">
                <h4 className="text-lg font-semibold text-red-500">₹{flight.price}</h4>
                <p className="text-xs text-gray-500">Seats Available: {flight.availableSeats}</p>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-sm font-semibold">{flight.from} - {flight.to}</p>
              <p className="text-xs mt-1">{flight.departureTime} - {flight.arrivalTime}</p>
              <p className="text-xs text-gray-500 mt-1">{flight.classType}</p>
            </div>

            <div className="mt-0 flex justify-end">
              <button className="bg-orange-500 text-white px-4 py-1 rounded-lg shadow-md">
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default FlightSearch;

import React, { useState } from "react";

const FlightSearch = () => {
  const [tripType, setTripType] = useState("one-way");
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Mumbai");
  const [departureDate, setDepartureDate] = useState("2024-08-09");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");

  const handleSearch = () => {
    console.log({
      tripType,
      from,
      to,
      departureDate,
      returnDate,
      travellers,
      travelClass,
    });
    alert("Search clicked! Check console for details.");
  };

  return (
    <div className="w-full ">
      <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
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

        <div className="flex justify-center space-x-6 mt-4">
          <button className="text-blue-500 font-semibold">Defence Forces</button>
          <button className="text-blue-500 font-semibold">Students</button>
          <button className="text-blue-500 font-semibold">Senior Citizens</button>
          <button className="text-blue-500 font-semibold">Doctors Nurses</button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;

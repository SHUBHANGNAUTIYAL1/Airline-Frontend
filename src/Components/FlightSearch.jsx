import React, { useState } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";
import BookingModal from "./BookingModal";

const FlightSearch = () => {
  const user = JSON.parse(localStorage.getItem("user"))._id;

  const [tripType, setTripType] = useState("one-way");
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Mumbai");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [flights, setFlights] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Get today's date in YYYY-MM-DD format
  const todayDate = new Date().toISOString().split("T")[0];

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8100/api/flight/");
      const allFlights = response.data;

      const filteredFlights = allFlights.filter((flight) => {
        const matchesFrom = flight.from?.trim().toLowerCase() === from.trim().toLowerCase();
        const matchesTo = flight.to?.trim().toLowerCase() === to.trim().toLowerCase();
        const matchesClass = flight.classType?.trim().toLowerCase() === travelClass.trim().toLowerCase();

        return matchesFrom && matchesTo && matchesClass;
      });

      if (filteredFlights.length > 0) {
        setFlights(filteredFlights);
        setErrorMessage("");
      } else {
        setFlights([]);
        setErrorMessage("No flights found matching your criteria.");
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      setErrorMessage("An error occurred while searching for flights. Please try again later.");
    }
  };

  const handleBookNow = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedFlight(null);
  };

  return (
    <div className="w-full">
      <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-6">
            <button
              onClick={() => setTripType("one-way")}
              className={`font-semibold ${tripType === "one-way" ? "text-blue-500" : "text-gray-500"}`}
            >
              One Way
            </button>
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


          {tripType === "round-trip" && (
            <div>
              <label className="block text-gray-500 font-semibold mb-1">RETURN DATE</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="bg-blue-100 p-2 rounded-lg w-full"
                min={departureDate || todayDate} // Ensure return date is not before departure date
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
                <option value="Premium Economy">Premium Economy</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button onClick={handleSearch} className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
              SEARCH
            </button>
          </div>
        </div>

        {/* Displaying Flights */}
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <FlightCard key={index} flight={flight} handleBookNow={handleBookNow} />
          ))
        ) : (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        )}
      </div>

      {showModal && selectedFlight && (
        <BookingModal
          flight={selectedFlight}
          user={user}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default FlightSearch;

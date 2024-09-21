import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Swal from 'sweetalert2';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51Pw6xrIsxzKgfHeHY5fiyzClawUAl8OJIO3B9buBoyGh78UJnYxPlAekLK5ry88axb4UXvrC2tD0G7lH06GZyCNn00DIk3M2VJ');

const BookingModal = ({ flight, user, handleModalClose }) => {
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTravellers, setBookingTravellers] = useState(1);
  const [travellerDetails, setTravellerDetails] = useState([{ name: '', age: '', gender: '' }]);
  const [selectedCategory, setSelectedCategory] = useState("none");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (price) => {
    const stripe = await stripePromise;

    try {
      const { data } = await axios.post('http://localhost:8100/api/payment/create', {
        flightId: flight.user,
        price: flight.price,
        user: user,
        from: flight.from,
        to: flight.to,
        airline: flight.airline,
        flightName: flight.flightNumber,
        time: `${flight.departureTime} - ${flight.arrivalTime}`,
        bookingDate,
        bookingTravellers,
        category: selectedCategory,
      });

      const sessionId = data.sessionId;

      if (!sessionId) {
        throw new Error("No sessionId returned from backend");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(`Stripe Checkout error: ${error.message}`);
      }
    } catch (error) {
      setError(error.message || 'Error creating checkout session');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    setIsProcessing(true);
    setError("");
    setSuccess("");

    let price = flight.price;
    if (selectedCategory !== "other") {
      price = flight.price * 0.95; // Apply 5% discount
    } else {
      price = flight.price;
    }

    try {
      await handleCheckout(price);
      setSuccess("Booking Successful!");
      Swal.fire({
        title: 'Thank You!',
        text: 'Your booking was successful.',
        icon: 'success',
        confirmButtonText: 'OK',
        background: '#f4f4f4',
        customClass: {
          popup: 'rounded-lg',
          title: 'font-bold text-lg',
          content: 'text-md',
        },
      });

      setTimeout(() => {
        handleModalClose();
      }, 1500);
    } catch (error) {
      setError("An error occurred while booking. Please try again.");
      console.error("Error booking flight:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle change in number of travellers
  const handleTravellersChange = (value) => {
    const numTravellers = parseInt(value);
    setBookingTravellers(numTravellers);

    // Adjust travellerDetails array based on number of travellers
    const newTravellerDetails = [...travellerDetails];
    while (newTravellerDetails.length < numTravellers) {
      newTravellerDetails.push({ name: '', age: '', gender: '' });
    }
    while (newTravellerDetails.length > numTravellers) {
      newTravellerDetails.pop();
    }
    setTravellerDetails(newTravellerDetails);
  };

  // Handle input change for traveller details
  const handleTravellerDetailChange = (index, field, value) => {
    const updatedDetails = [...travellerDetails];
    updatedDetails[index][field] = value;
    setTravellerDetails(updatedDetails);
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white h-[80%] overflow-y-scroll w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-500 font-semibold mb-1">From</label>
            <input
              type="text"
              value={flight.from}
              readOnly
              className="bg-gray-100 p-2 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="block text-gray-500 font-semibold mb-1">To</label>
            <input
              type="text"
              value={flight.to}
              readOnly
              className="bg-gray-100 p-2 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="block text-gray-500 font-semibold mb-1">Airline</label>
            <input
              type="text"
              value={flight.airline}
              readOnly
              className="bg-gray-100 p-2 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="block text-gray-500 font-semibold mb-1">Flight Name</label>
            <input
              type="text"
              value={flight.flightNumber}
              readOnly
              className="bg-gray-100 p-2 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="block text-gray-500 font-semibold mb-1">Time</label>
            <input
              type="text"
              value={`${flight.departureTime} - ${flight.arrivalTime}`}
              readOnly
              className="bg-gray-100 p-2 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="block text-gray-500 font-semibold mb-1">Date</label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="bg-blue-100 p-2 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="block text-gray-500 font-semibold mb-1">Number of People</label>
            <input
              type="number"
              min="1"
              value={bookingTravellers}
              onChange={(e) => handleTravellersChange(e.target.value)}
              className="bg-blue-100 p-2 rounded-lg w-full"
            />
          </div>

          {/* Dynamically Render Traveller Details */}
          {travellerDetails.map((traveller, index) => (
            <div key={index} className="space-y-2 border-b pb-2 mb-2">
              <h3 className="text-gray-700 font-semibold">Traveller {index + 1}</h3>
              <div>
                <label className="block text-gray-500 font-semibold mb-1">Name</label>
                <input
                  type="text"
                  value={traveller.name}
                  onChange={(e) => handleTravellerDetailChange(index, 'name', e.target.value)}
                  className="bg-blue-100 p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block text-gray-500 font-semibold mb-1">Age</label>
                <input
                  type="number"
                  min="1"
                  value={traveller.age}
                  onChange={(e) => handleTravellerDetailChange(index, 'age', e.target.value)}
                  className="bg-blue-100 p-2 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="block text-gray-500 font-semibold mb-1">Gender</label>
                <select
                  value={traveller.gender}
                  onChange={(e) => handleTravellerDetailChange(index, 'gender', e.target.value)}
                  className="bg-blue-100 p-2 rounded-lg w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          ))}

          <div>
            <label className="block text-gray-500 font-semibold mb-1">Select Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-blue-100 p-2 rounded-lg w-full"
            >
              <option value="other">Others</option>
              <option value="nurse">Nurse</option>
              <option value="army">Army</option>
              <option value="seniorcitizen">Senior Citizen</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
          </div>

          <button
            onClick={handleBooking}
            className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition-colors"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Book Now"}
          </button>
        </div>
        <button
          onClick={handleModalClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default BookingModal;

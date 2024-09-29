import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Swal from 'sweetalert2';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51Pw6xrIsxzKgfHeHY5fiyzClawUAl8OJIO3B9buBoyGh78UJnYxPlAekLK5ry88axb4UXvrC2tD0G7lH06GZyCNn00DIk3M2VJ');

const BookingModal = ({ flight, user, handleModalClose }) => {
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTravellers, setBookingTravellers] = useState(1);
  const [travellerDetails, setTravellerDetails] = useState([{ name: '', age: '', gender: '', category: 'other' }]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const categoryDiscounts = {
    "nurse": 0.05,
    "army": 0.1,
    "seniorcitizen": 0.07,
    "student": 0.08,
    "other": 0,
  };

  const handleCheckout = async (totalPrice) => {
    const stripe = await stripePromise;

    try {
      const { data } = await axios.post('http://localhost:8100/api/payment/create', {
        flightId: flight.user,
        price: totalPrice,
        user: user,
        from: flight.from,
        to: flight.to,
        airline: flight.airline,
        flightName: flight.flightNumber,
        time: `${flight.departureTime} - ${flight.arrivalTime}`,
        bookingDate,
        bookingTravellers,
        travellerDetails, // Send traveler details to backend
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

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    travellerDetails.forEach(traveller => {
      let basePrice = flight.price;
      const discount = categoryDiscounts[traveller.category] || 0;
      const finalPrice = basePrice * (1 - discount);
      totalPrice += finalPrice;
    });
    return totalPrice.toFixed(2);
  };

  const handleBooking = async () => {
    setIsProcessing(true);
    setError("");
    setSuccess("");

    const totalPrice = calculateTotalPrice();

    try {
      await handleCheckout(totalPrice);
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
      newTravellerDetails.push({ name: '', age: '', gender: '', category: 'other' });
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

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white h-[80%] overflow-y-scroll w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
        <div className="space-y-4">
          {/* Flight Info */}
          <div><label className="block text-gray-500 font-semibold mb-1">From</label><input type="text" value={flight.from} readOnly className="bg-gray-100 p-2 rounded-lg w-full" /></div>
          <div><label className="block text-gray-500 font-semibold mb-1">To</label><input type="text" value={flight.to} readOnly className="bg-gray-100 p-2 rounded-lg w-full" /></div>
          <div><label className="block text-gray-500 font-semibold mb-1">Airline</label><input type="text" value={flight.airline} readOnly className="bg-gray-100 p-2 rounded-lg w-full" /></div>
          <div><label className="block text-gray-500 font-semibold mb-1">Flight Name</label><input type="text" value={flight.flightNumber} readOnly className="bg-gray-100 p-2 rounded-lg w-full" /></div>
          <div><label className="block text-gray-500 font-semibold mb-1">Time</label><input type="text" value={`${flight.departureTime} - ${flight.arrivalTime}`} readOnly className="bg-gray-100 p-2 rounded-lg w-full" /></div>

          {/* Date, Travellers, and Traveller Details */}
          <div>
            <label className="block text-gray-500 font-semibold mb-1">Date</label>
            <input type="date" min={todayDate} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="bg-blue-100 p-2 rounded-lg w-full" />
          </div>
          <div>
            <label className="block text-gray-500 font-semibold mb-1">Number of People</label>
            <input type="number" min="1" value={bookingTravellers} onChange={(e) => handleTravellersChange(e.target.value)} className="bg-blue-100 p-2 rounded-lg w-full" />
          </div>

          {/* Dynamically Render Traveller Details */}
          {travellerDetails.map((traveller, index) => (
            <div key={index} className="space-y-2 border-b pb-2 mb-2">
              <h3 className="text-gray-700 font-semibold">Traveller {index + 1}</h3>
              <div><label className="block text-gray-500 font-semibold mb-1">Name</label><input type="text" maxLength={20} value={traveller.name} onChange={(e) => handleTravellerDetailChange(index, 'name', e.target.value)} className="bg-blue-100 p-2 rounded-lg w-full" /></div>
              <div><label className="block text-gray-500 font-semibold mb-1">Age</label><input type="number" min="1" max="100" value={traveller.age} onChange={(e) => handleTravellerDetailChange(index, 'age', e.target.value)} className="bg-blue-100 p-2 rounded-lg w-full" /></div>
              <div>
                <label className="block text-gray-500 font-semibold mb-1">Gender</label>
                <select value={traveller.gender} onChange={(e) => handleTravellerDetailChange(index, 'gender', e.target.value)} className="bg-blue-100 p-2 rounded-lg w-full">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-500 font-semibold mb-1">Category</label>
                <select value={traveller.category} onChange={(e) => handleTravellerDetailChange(index, 'category', e.target.value)} className="bg-blue-100 p-2 rounded-lg w-full">
                  <option value="nurse">Nurse (5% discount)</option>
                  <option value="army">Army (10% discount)</option>
                  <option value="seniorcitizen">Senior Citizen (7% discount)</option>
                  <option value="student">Student (8% discount)</option>
                  <option value="other">Other (No discount)</option>
                </select>
              </div>
            </div>
          ))}

          {/* Price Calculation and Submission */}
          <div><label className="block text-gray-500 font-semibold mb-1">Total Price</label><input type="text" value={calculateTotalPrice()} readOnly className="bg-gray-100 p-2 rounded-lg w-full" /></div>
          <button onClick={handleBooking} disabled={isProcessing || !bookingDate} className={`w-full bg-blue-500 text-white font-semibold p-2 rounded-lg mt-4 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isProcessing ? "Processing..." : "Book Now"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
        <button onClick={handleModalClose} className="absolute top-2 right-2 bg-red-400 text-white p-1 rounded-full">X</button>
      </div>
    </div>
  );
};

export default BookingModal;

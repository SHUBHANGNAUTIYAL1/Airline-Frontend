import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Swal from 'sweetalert2';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51Pw6xrIsxzKgfHeHY5fiyzClawUAl8OJIO3B9buBoyGh78UJnYxPlAekLK5ry88axb4UXvrC2tD0G7lH06GZyCNn00DIk3M2VJ');

const BookingModal = ({ flight, user, handleModalClose }) => {
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTravellers, setBookingTravellers] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("none");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (price) => {
    const stripe = await stripePromise;

    try {
      // Request a Checkout Session from the backend
      const { data } = await axios.post('http://localhost:8100/api/payment/create', {
        flightId: flight.user,
        price:flight.price,
        user:user,
        from: flight.from,
        to: flight.to,
        airline: flight.airline,
        flightName:flight.flightNumber,
        time: `${flight.departureTime} - ${flight.arrivalTime}`,
        bookingDate,
        bookingTravellers,
        category:selectedCategory,
      });

      // Check if sessionId is returned
      const sessionId = data.sessionId;

      if (!sessionId) {
        throw new Error("No sessionId returned from backend");
      }

      // Redirect to Stripe Checkout
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
    if (selectedCategory !== "none") {
      price = flight.price * 0.95; // Apply 5% discount
    }

    try {
      // Start the payment process first
      

      // After successful payment, send booking data to the backend
      const response = await axios.post("http://localhost:8100/api/booking/create", {
        flightId: flight.user,
        user:user,
        from: flight.from,
        to: flight.to,
        airline: flight.airline,
        flightName:flight.flightNumber,
        time: `${flight.departureTime} - ${flight.arrivalTime}`,
        bookingDate,
        bookingTravellers,
        price,
        category:selectedCategory,
     
      });
      console.log(response)

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
      }, 1500); // Close modal after 1.5 seconds

    } catch (error) {
      setError("An error occurred while booking. Please try again.");
      console.error("Error booking flight:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
        <div className="space-y-4">
          {/* Form Fields */}
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
              value={bookingTravellers}
              onChange={(e) => setBookingTravellers(e.target.value)}
              className="bg-blue-100 p-2 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="block text-gray-500 font-semibold mb-1">Select Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-blue-100 p-2 rounded-lg w-full"
            >
              <option value="none">None</option>
              <option value="nurse">Nurse</option>
              <option value="army">Army</option>
              <option value="seniorcitizen">Senior Citizen</option>
              <option value="student">Student</option>
            </select>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
          {loading && <p className="text-gray-500 mt-2">Processing payment...</p>}
          <div className="mt-4 flex justify-between">
            <button
              onClick={handleBooking}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold"
              disabled={isProcessing || loading}
            >
              {isProcessing ? "Processing..." : "Confirm Booking"}
            </button>
            <button
              onClick={handleModalClose}
              className="text-blue-500 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

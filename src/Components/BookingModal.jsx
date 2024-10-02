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
    handleBookingCreate();
    const stripe = await stripePromise;
    

    try {
      const { data } = await axios.post('https://airline-backend.onrender.com/api/payment/create', {
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
        travellerDetails,
      });

      const sessionId = data.sessionId;

      if (!sessionId) {
        throw new Error("No sessionId returned from backend");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(`Stripe Checkout error: ${error.message}`);
      }
      if (response.status === 201) {
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
          handleModalClose(); // Close modal after success
        }, 1500);
      }

      // After successful payment, trigger the booking API call
      
    } catch (error) {
      setError(error.message || 'Error creating checkout session');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingCreate = async () => {
    try {
      const response = await axios.post("https://airline-backend.onrender.com/api/booking/create", {
        flightId: flight._id, // Flight ObjectId
        userId: user._id, // User ObjectId
        from: flight.from, 
        to: flight.to,
        airline: flight.airline,
        flightName: flight.flightNumber,
        time: `${flight.departureTime} - ${flight.arrivalTime}`,
        bookingDate,
        bookingTravellers,
        user: user,
        travellerDetails, // Array of traveller objects
        totalPrice: totalPrice, // Total calculated price
      });
  
      
    } catch (error) {
      console.error('Booking creation error:', error);
      setError("Error creating booking, please try again.");
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
    } catch (error) {
      setError("An error occurred while booking. Please try again.");
      console.error("Error booking flight:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTravellersChange = (value) => {
    const numTravellers = parseInt(value);
    setBookingTravellers(numTravellers);

    const newTravellerDetails = [...travellerDetails];
    while (newTravellerDetails.length < numTravellers) {
      newTravellerDetails.push({ name: '', age: '', gender: '', category: 'other' });
    }
    while (newTravellerDetails.length > numTravellers) {
      newTravellerDetails.pop();
    }
    setTravellerDetails(newTravellerDetails);
  };

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
          <div><label className="block text-gray-500 font-semibold mb-1">From</label><input type="text" value={flight.from} readOnly className="bg-gray-100 p-2 rounded-lg w-full" /></div>
          <div><label className="block text-gray-500 font-semibold mb-1">To</label><input type="text" value={flight.to} readOnly className="bg-gray-100 p-2 rounded-lg w-full" /></div>
          <div><label className="block text-gray-500 font-semibold mb-1">Airline</label><input type="text" value={flight.airline} readOnly className="bg-gray-100 p-2 rounded-lg w-full" /></div>
          <div><label className="block text-gray-500 font-semibold mb-1">Flight Name</label><input type="text" value={flight.flightNumber} readOnly className="bg-gray-100 p-2 rounded-lg w-full" /></div>
          <div><label className="block text-gray-500 font-semibold mb-1">Time</label><input type="text" value={`${flight.departureTime} - ${flight.arrivalTime}`} readOnly className="bg-gray-100 p-2 rounded-lg w-full" /></div>

          <div>
            <label className="block text-gray-500 font-semibold mb-1">Date</label>
            <input type="date" min={todayDate} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="bg-blue-100 p-2 rounded-lg w-full" />
          </div>
          <div>
            <label className="block text-gray-500 font-semibold mb-1">Number of People</label>
            <input type="number" min="1" value={bookingTravellers} onChange={(e) => handleTravellersChange(e.target.value)} className="bg-blue-100 p-2 rounded-lg w-full" />
          </div>

          {travellerDetails.map((traveller, index) => (
            <div key={index} className="space-y-2 border-b pb-2 mb-2">
              <h3 className="text-gray-700 font-semibold">Traveller {index + 1}</h3>
              <div><label className="block text-gray-500 font-semibold mb-1">Name</label><input type="text" maxLength={20} value={traveller.name} onChange={(e) => handleTravellerDetailChange(index, 'name', e.target.value)} className="bg-blue-100 p-2 rounded-lg w-full" /></div>
              <div><label className="block text-gray-500 font-semibold mb-1">Age</label><input type="number" maxLength={3} min="1" max="100" value={traveller.age} onChange={(e) => handleTravellerDetailChange(index, 'age', e.target.value)} className="bg-blue-100 p-2 rounded-lg w-full" /></div>
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
                  <option value="other">Other</option>
                  <option value="student">Student</option>
                  <option value="nurse">Nurse</option>
                  <option value="army">Army</option>
                  <option value="seniorcitizen">Senior Citizen</option>
                </select>
              </div>
            </div>
          ))}

          <div>
            <label className="block text-gray-500 font-semibold mb-1">Total Price</label>
            <input type="text" value={`$${calculateTotalPrice()}`} readOnly className="bg-gray-100 p-2 rounded-lg w-full" />
          </div>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}

        <button onClick={handleBooking} disabled={loading || isProcessing} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg mt-4 w-full">
          {isProcessing ? "Processing..." : "Book Now"}
        </button>
        <button onClick={handleModalClose} className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-red-600">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default BookingModal;

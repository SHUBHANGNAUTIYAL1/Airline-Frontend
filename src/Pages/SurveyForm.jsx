import React, { useState } from 'react';
import Sidebar from '../Components/SideBar';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    budget: '',
    travellers: '',
    departureDate: '',
    departureLocation: '',
    returnDate: '',
    preferredClass: '',
    mealPreference: '',
    specialAssistance: '',
    preferredAirline: '',
    baggageWeight: '',
    travelPurpose: '',
    accommodationType: '',
    additionalRequests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // You can send formData to the backend or use it to recommend packages
  };

  return (

    <div className='h-screen w-full flex'>

        <Sidebar/>
    <div className="h-screen w-full overflow-y-scroll bg-gray-100  flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white mt-[1000px] mb-10 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Flight Package Survey</h2>

        <div className="mb-4 mt-10">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter destination"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="days">Number of Days</label>
          <input
            type="number"
            id="days"
            name="days"
            value={formData.days}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter number of days"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="budget">Budget (₹)</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your budget"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="travellers">Number of Travellers</label>
          <input
            type="number"
            id="travellers"
            name="travellers"
            value={formData.travellers}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter number of travellers"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="departureDate">Departure Date</label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="departureLocation">Departure Location</label>
          <input
            type="text"
            id="departureLocation"
            name="departureLocation"
            value={formData.departureLocation}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter departure location"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="returnDate">Return Date</label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="preferredClass">Preferred Class</label>
          <select
            id="preferredClass"
            name="preferredClass"
            value={formData.preferredClass}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select class</option>
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="mealPreference">Meal Preference</label>
          <select
            id="mealPreference"
            name="mealPreference"
            value={formData.mealPreference}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select meal preference</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="no-preference">No Preference</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="specialAssistance">Special Assistance</label>
          <textarea
            id="specialAssistance"
            name="specialAssistance"
            value={formData.specialAssistance}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter any special assistance required"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="preferredAirline">Preferred Airline</label>
          <input
            type="text"
            id="preferredAirline"
            name="preferredAirline"
            value={formData.preferredAirline}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter preferred airline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="baggageWeight">Baggage Weight (kg)</label>
          <input
            type="number"
            id="baggageWeight"
            name="baggageWeight"
            value={formData.baggageWeight}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter baggage weight"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="travelPurpose">Purpose of Travel</label>
          <input
            type="text"
            id="travelPurpose"
            name="travelPurpose"
            value={formData.travelPurpose}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter purpose of travel (e.g., Business, Leisure)"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="accommodationType">Preferred Accommodation Type</label>
          <select
            id="accommodationType"
            name="accommodationType"
            value={formData.accommodationType}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select accommodation type</option>
            <option value="hotel">Hotel</option>
            <option value="resort">Resort</option>
            <option value="guesthouse">Guesthouse</option>
            <option value="hostel">Hostel</option>
            <option value="apartment">Apartment</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="additionalRequests">Additional Requests</label>
          <textarea
            id="additionalRequests"
            name="additionalRequests"
            value={formData.additionalRequests}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter any additional requests"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default SurveyForm;

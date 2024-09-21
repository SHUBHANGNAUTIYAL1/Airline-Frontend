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

  const [recommendation, setRecommendation] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const travelData = [
    {
      destination: 'Paris',
      minBudget: 3000,
      maxBudget: 6000,
      recommendation: 'Explore the iconic Eiffel Tower, the Louvre, and charming street cafes in the heart of France.',
    },
    {
      destination: 'London',
      minBudget: 3500,
      maxBudget: 6400,
      recommendation: 'Visit historical landmarks like the Tower of London, Buckingham Palace, and enjoy British culture.',
    },
    {
      destination: 'Tokyo',
      minBudget: 4000,
      maxBudget: 7000,
      recommendation: 'Experience the blend of traditional and modern Japan with temples, skyscrapers, and sushi.',
    },
    {
      destination: 'New York City',
      minBudget: 5000,
      maxBudget: 8000,
      recommendation: 'Discover the vibrant streets of NYC, visit Central Park, Times Square, and Broadway shows.',
    },
    {
      destination: 'Sydney',
      minBudget: 4400,
      maxBudget: 7400,
      recommendation: 'Explore the Sydney Opera House, beaches like Bondi, and vibrant Australian wildlife.',
    },
    {
      destination: 'Rome',
      minBudget: 2600,
      maxBudget: 5000,
      recommendation: 'Step back in time with visits to the Colosseum, Vatican City, and ancient Roman architecture.',
    },
    {
      destination: 'Dubai',
      minBudget: 2400,
      maxBudget: 5000,
      recommendation: 'Experience the grandeur of Dubai, from luxurious malls to thrilling desert safaris and sky-high buildings.',
    },
    {
      destination: 'Singapore',
      minBudget: 3000,
      maxBudget: 5400,
      recommendation: 'Visit the futuristic Marina Bay Sands, Gardens by the Bay, and enjoy vibrant street food.',
    },
    {
      destination: 'Bangkok',
      minBudget: 1600,
      maxBudget: 3000,
      recommendation: 'Explore Thailand’s rich cultural heritage through temples, markets, and delicious street food.',
    },
    {
      destination: 'Barcelona',
      minBudget: 2800,
      maxBudget: 5200,
      recommendation: 'Discover the stunning architecture of Gaudi, relax on beautiful beaches, and enjoy Spanish cuisine.',
    },
    {
      destination: 'Bali',
      minBudget: 2000,
      maxBudget: 3600,
      recommendation: 'Relax in scenic resorts, explore lush jungles, rice terraces, and pristine beaches.',
    },
    {
      destination: 'Phuket',
      minBudget: 1800,
      maxBudget: 3400,
      recommendation: 'Enjoy Thailand’s stunning beaches, lively nightlife, and explore cultural temples.',
    },
    {
      destination: 'Cape Town',
      minBudget: 3200,
      maxBudget: 6000,
      recommendation: 'Experience the natural beauty of Table Mountain, explore the vineyards, and stunning beaches.',
    },
    {
      destination: 'Rio de Janeiro',
      minBudget: 3400,
      maxBudget: 5800,
      recommendation: 'Visit the iconic Christ the Redeemer, Copacabana beach, and experience Brazilian carnival culture.',
    },
    {
      destination: 'Santorini',
      minBudget: 2400,
      maxBudget: 5000,
      recommendation: 'Relax in the picturesque white-washed villages, soak in breathtaking sunsets, and explore Greek islands.',
    },
    {
      destination: 'Cairo',
      minBudget: 2200,
      maxBudget: 4000,
      recommendation: 'Discover the ancient pyramids of Giza, explore Egyptian history, and the bustling bazaars of Cairo.',
    },
    {
      destination: 'Amsterdam',
      minBudget: 3200,
      maxBudget: 6000,
      recommendation: 'Cruise through the canals, visit Van Gogh Museum, and enjoy the unique Dutch culture.',
    },
    {
      destination: 'Istanbul',
      minBudget: 2200,
      maxBudget: 4000,
      recommendation: 'Experience the cultural fusion of East and West, visit Hagia Sophia, and the bustling Grand Bazaar.',
    },
    {
      destination: 'Maldives',
      minBudget: 3600,
      maxBudget: 7000,
      recommendation: 'Stay at luxury resorts, snorkel in crystal-clear waters, and relax on pristine beaches.',
    },
    {
      destination: 'Venice',
      minBudget: 3000,
      maxBudget: 5600,
      recommendation: 'Cruise through the canals, visit the iconic St. Mark’s Square, and enjoy romantic Venetian scenery.',
    },
    {
      destination: 'Moscow',
      minBudget: 3800,
      maxBudget: 7000,
      recommendation: 'Explore the Red Square, Kremlin, and experience Russian culture and history.',
    },
    {
      destination: 'Los Angeles',
      minBudget: 4600,
      maxBudget: 8000,
      recommendation: 'Visit Hollywood, explore beaches like Santa Monica, and enjoy theme parks and shopping.',
    },
    {
      destination: 'Hong Kong',
      minBudget: 2600,
      maxBudget: 4800,
      recommendation: 'Explore a unique blend of cultures, towering skyscrapers, and bustling street markets.',
    },
    {
      destination: 'Maui',
      minBudget: 4000,
      maxBudget: 7000,
      recommendation: 'Relax on beautiful beaches, hike through scenic parks, and experience Hawaiian culture.',
    },
    {
      destination: 'Vienna',
      minBudget: 2800,
      maxBudget: 5400,
      recommendation: 'Explore imperial palaces, listen to classical music, and enjoy vibrant Austrian cafes.',
    },
    {
      destination: 'Hawaii',
      minBudget: 3800,
      maxBudget: 7000,
      recommendation: 'Experience tropical paradise with beaches, volcanoes, and a rich Polynesian culture.',
    },
    {
      destination: 'Florence',
      minBudget: 2600,
      maxBudget: 5000,
      recommendation: 'Discover Renaissance art, architecture, and visit world-renowned galleries like the Uffizi.',
    },
    {
      destination: 'Zurich',
      minBudget: 4000,
      maxBudget: 7000,
      recommendation: 'Explore scenic lakes, snow-capped mountains, and enjoy Swiss culture and chocolate.',
    },
    {
      destination: 'Lisbon',
      minBudget: 2400,
      maxBudget: 4400,
      recommendation: 'Discover vibrant culture, historic architecture, and enjoy Portuguese cuisine.',
    },
    {
      destination: 'Seoul',
      minBudget: 3400,
      maxBudget: 6400,
      recommendation: 'Explore futuristic skyscrapers, traditional temples, and K-pop culture in South Korea.',
    },
    {
      destination: 'Prague',
      minBudget: 2800,
      maxBudget: 5000,
      recommendation: 'Visit historical castles, explore medieval architecture, and walk across the iconic Charles Bridge.',
    },
    {
      destination: 'Berlin',
      minBudget: 3200,
      maxBudget: 6000,
      recommendation: 'Explore rich history, vibrant arts, and visit landmarks like the Berlin Wall and Brandenburg Gate.',
    },
    {
      destination: 'Helsinki',
      minBudget: 3200,
      maxBudget: 5800,
      recommendation: 'Discover Finnish design, the Northern Lights, and enjoy Scandinavian culture.',
    },
    {
      destination: 'Marrakech',
      minBudget: 2200,
      maxBudget: 4000,
      recommendation: 'Explore the bustling souks, beautiful palaces, and vibrant Moroccan culture.',
    },
    {
      destination: 'Athens',
      minBudget: 2600,
      maxBudget: 5000,
      recommendation: 'Visit ancient ruins, explore Greek history, and enjoy Mediterranean cuisine in Athens.',
    },
    {
      destination: 'Mexico City',
      minBudget: 2000,
      maxBudget: 3600,
      recommendation: 'Explore the cultural heritage, ancient pyramids, and bustling markets of Mexico’s capital.',
    },
    {
      destination: 'Kyoto',
      minBudget: 3000,
      maxBudget: 5400,
      recommendation: 'Experience traditional Japanese temples, gardens, and the historic streets of Kyoto.',
    },
    {
      destination: 'Las Vegas',
      minBudget: 3600,
      maxBudget: 6400,
      recommendation: 'Enjoy the entertainment capital with casinos, luxury hotels, and world-class shows.',
    },
    {
      destination: 'Munich',
      minBudget: 2800,
      maxBudget: 5400,
      recommendation: 'Visit the famous Oktoberfest, explore German history, and enjoy Bavarian beer gardens.',
    },
    {
      destination: 'Edinburgh',
      minBudget: 3000,
      maxBudget: 5400,
      recommendation: 'Explore the historic Edinburgh Castle, the Royal Mile, and enjoy Scottish culture and landscapes.',
    },
  ];
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter destinations based on budget and randomly select one
    const suitableDestinations = travelData.filter(
      (place) =>
        place.destination.toLowerCase().includes(formData.destination.toLowerCase()) &&
        place.minBudget <= formData.budget && place.maxBudget >= formData.budget
    );

    if (suitableDestinations.length > 0) {
      const randomDestination = suitableDestinations[Math.floor(Math.random() * suitableDestinations.length)];
      
      // Randomly calculate flight and accommodation costs
      const flightCost = Math.floor((Math.random() * 0.4 + 0.3) * formData.budget); // 30-70% of the budget
      const accommodationCost = formData.budget - flightCost;

      setRecommendation({
        destination: randomDestination.destination,
        recommendation: randomDestination.recommendation,
        budget: `Suggested budget range: $${randomDestination.minBudget} - $${randomDestination.maxBudget}`,
        flightCost: `Flight Cost: $${flightCost} `,
        accommodationCost: `Accommodation Cost: $${accommodationCost} total`,
      });

      setShowModal(true); // Open the modal when a recommendation is found
    } else {
      setRecommendation({
        destination: 'No suitable destination found',
        recommendation: 'Please adjust your budget or try a different destination.',
        budget: '',
      });

      setShowModal(true); // Show modal even if no recommendation is found
    }

    console.log(formData);
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
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
      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full relative transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
      <button
        className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition-colors duration-200 ease-in-out"
        onClick={closeModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h3 className="text-2xl font-extrabold text-green-700 mb-4">Recommended Package</h3>
      {recommendation ? (
        <div className="space-y-3">
          <p className="text-lg text-gray-700">
            <span className="font-bold text-gray-900">Destination: </span>{recommendation.destination}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-bold text-gray-900">Details: </span>{recommendation.recommendation}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-bold text-gray-900">Budget: </span>{recommendation.budget}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-bold text-gray-900">Flight Cost: </span>{recommendation.flightCost}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-bold text-gray-900">Accommodation Cost: </span>{recommendation.accommodationCost}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">No recommendation available.</p>
      )}
    </div>
  </div>
)}
    </div>
    </div>
  );
};

export default SurveyForm;

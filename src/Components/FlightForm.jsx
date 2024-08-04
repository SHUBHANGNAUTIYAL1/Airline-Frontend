import React, { useState } from 'react';
import axios from 'axios';

const FlightForm = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userID = user._id;

  const [formData, setFormData] = useState({
    flightNumber: '',
    name: '',
    airline: '',
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    availableSeats: '',
    classType: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';

    // Upload image to Cloudinary if there's an image
    if (formData.image) {
      const formDataForImage = new FormData();
      formDataForImage.append('file', formData.image);
      formDataForImage.append('upload_preset', 'upload');

      try {
        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/dh6zjine0/image/upload',
          formDataForImage
        );
        imageUrl = uploadRes.data.url;
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    // Prepare the form data to be sent to the backend
    const data = {
      ...formData,
      user: userID,
      image: imageUrl,
    };

    try {
      const response = await axios.post('http://localhost:8100/api/flight/create', data);
      console.log('Flight created:', response.data);
      alert("flight created Successfully")
      window.location.reload();
      // Refresh the page or update the state to show the new flight
    } catch (error) {
      console.error('Error creating flight:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Flight</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Flight Number</label>
        <input
          type="text"
          name="flightNumber"
          value={formData.flightNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Flight Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Airline</label>
        <input
          type="text"
          name="airline"
          value={formData.airline}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">From</label>
        <input
          type="text"
          name="from"
          value={formData.from}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">To</label>
        <input
          type="text"
          name="to"
          value={formData.to}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Departure Time</label>
        <input
          type="time"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Arrival Time</label>
        <input
          type="time"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Available Seats</label>
        <input
          type="number"
          name="availableSeats"
          value={formData.availableSeats}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Flight Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Class Type</label>
        <select
          name="classType"
          value={formData.classType}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="" disabled>Select class</option>
          <option value="Business">Business</option>
          <option value="Economy">Economy</option>
          <option value="First Class">First Class</option>
          <option value="Premium Economy">Premium Economy</option>
        </select>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Create Flight
      </button>
    </form>
  );
};

export default FlightForm;

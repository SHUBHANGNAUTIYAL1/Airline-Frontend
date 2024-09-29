import React, { useEffect, useRef, useState } from 'react';
import HotelCard from '../Components/HotelCard';
import axios from 'axios';
import Sidebar from '../Components/SideBar';

const key = 'a8e25abea7msh8465279dfb74285p1645c5jsn70922a7ec0cf';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const idArray = useRef([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [request, setRequest] = useState({ checkin: '', checkout: '', location: '' });

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setRequest((prevRequest) => ({
              ...prevRequest,
              location: `Auckland`,
            }));
          },
          (error) => {
            console.error('Error fetching current location:', error);
            setRequest((prevRequest) => ({
              ...prevRequest,
              location: 'Auckland', // Fallback to default location if geolocation fails
            }));
          }
        );
      } else {
        setRequest((prevRequest) => ({
          ...prevRequest,
          location: 'Auckland', // Fallback if geolocation is not supported
        }));
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (request.location) {
      searchHotels();
    }
  }, [request.location]);

  const todaysDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const tomDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const yyyy = tomorrow.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const getDestinationId = async (destination) => {
    const options = {
      method: 'GET',
      url: 'https://hotels-com-provider.p.rapidapi.com/v2/regions',
      params: { locale: 'en_IN', query: destination, domain: 'IN' },
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const id = response.data.data[0].gaiaId;
      getHotelById(id);
    } catch (error) {
      console.error('Error fetching destination ID:', error);
      setLoading(false);
    }
  };

  const setIdArray = (arr) => {
    idArray.current = [...arr];
  };

  const getHotelById = async (id) => {
    const options = {
      method: 'GET',
      url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/search',
      params: {
        domain: 'IN',
        sort_order: 'REVIEW',
        checkin_date: request.checkin || todaysDate(),
        checkout_date: request.checkout || tomDate(),
        region_id: id,
        adults_number: '1', // Defaulting to 1 adult
        locale: 'en_IN',
      },
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const hotelArray = response.data.properties;
      const tempArr = hotelArray.slice(0, 20).map((hotel) => ({
        id: hotel.id,
        image: hotel.propertyImage.image.url,
        price: hotel.price.lead.formatted,
      }));

      setIdArray(tempArr);
      getHotelDetails();
    } catch (error) {
      console.error('Error fetching hotels by ID:', error);
      setLoading(false);
    }
  };

  const getHotelDetails = async () => {
    const currentCount = count + 4;
    const hotelsToFetch = idArray.current.slice(count, currentCount);
    setCount(currentCount);

    for (let hotel of hotelsToFetch) {
      try {
        const temp_options = {
          method: 'GET',
          url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/details',
          params: {
            domain: 'IN',
            locale: 'en_IN',
            hotel_id: hotel.id,
          },
          headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com',
          },
        };

        const response = await axios.request(temp_options);
        if (response.data && response.data.summary) {
          const hotelImages = response.data.propertyGallery.images.slice(0, 4).map((img) => img.image.url);
          
          const obj = {
            id: response.data.summary.id,
            name: response.data.summary.name,
            address: `${response.data.summary.location.address.firstAddressLine} ${response.data.summary.location.address.secondAddressLine || ''}`,
            price: new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' }).format(Math.random() * (500 - 100) + 100),

            rating: response.data.summary.overview.propertyRating.rating,
            thumbnail: hotel.image,
            images: hotelImages,
            mapImage: response.data.summary.location.staticImage.url,
          };

          setHotels((prevHotels) => [...prevHotels, obj]);
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    }

    setLoading(false);
  };

  const searchHotels = () => {
    setLoading(true);
    setHotels([]); // Clear the previous search data
    setIdArray([]); // Clear the previous idArray
    setCount(0);
    getDestinationId(request.location);
  };

  const submit = (e) => {
    e.preventDefault();
    const inputCheckin = new Date(request.checkin);
    const inputCheckout = new Date(request.checkout);
    const today = new Date();

    if (inputCheckin.getTime() < today.getTime() || inputCheckout.getTime() < today.getTime()) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    searchHotels();
  };

  const onchange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const fetchMoreHotels = () => {
    getHotelDetails();
  };

  return (
    <div className="flex w-full justify-between h-screen">
      <Sidebar />
      <div className="flex flex-col items-center w-[60%] h-full p-4 overflow-y-auto bg-gray-50">
        {loading && (
          <div className="flex justify-center my-6">
            <img src="./images/loading.gif" alt="Loading..." className="w-20 h-20" />
          </div>
        )}
        <div className="grid grid-cols-1 gap-6">
          {hotels.map((element) => (
            <div key={element.id}>
              <HotelCard
                name={element.name}
                address={element.address}
                price={element.price}
                rating={element.rating}
                image={element.thumbnail}
                hotelImages={element.images}
              />
            </div>
          ))}
        </div>
        {!loading && hotels.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={fetchMoreHotels}
              className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
            >
              Find More
            </button>
          </div>
        )}
      </div>

      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <div className="hotels-booking-area p-4 bg-gray-100 rounded-lg shadow-md">
          <form onSubmit={submit}>
            <div className="form-group mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={request.location}
                onChange={onchange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter location"
                required
              />
            </div>
            <div className="form-group mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkin">
                Check-in Date
              </label>
              <input
                type="date"
                name="checkin"
                id="checkin"
                value={request.checkin}
                onChange={onchange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                min={todaysDate()}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkout">
                Check-out Date
              </label>
              <input
                type="date"
                name="checkout"
                id="checkout"
                value={request.checkout}
                onChange={onchange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                min={tomDate()}
                required
              />
            </div>
            {showAlert && (
              <p className="text-red-500 text-sm mb-4">Check-in and Check-out dates should be valid.</p>
            )}
            <div className="form-group">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hotels;

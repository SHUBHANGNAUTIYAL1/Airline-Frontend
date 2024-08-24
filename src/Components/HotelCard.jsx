import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

const HotelCard = ({ name, address, price, rating, image, hotelImages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openSlideshow = () => setIsOpen(true);
  const closeSlideshow = () => setIsOpen(false);

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === hotelImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? hotelImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="hotel-item w-[800px] bg-white rounded-lg shadow-md p-4 mb-4">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
        onClick={openSlideshow}
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-700 mb-2">{address}</p>

        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-green-600">{price}</span>
          <span className="bg-yellow-400 text-white py-1 px-2 rounded-full text-sm">{rating} ★</span>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={closeSlideshow}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="relative w-full max-w-4xl">
          <button
            className="absolute top-2 z-50 right-2 text-white text-3xl font-semibold"
            onClick={closeSlideshow}
          >
            ✕
          </button>
          <div className="relative flex items-center justify-center">
            <button
              onClick={goToPrevImage}
              className="absolute left-0 z-10 p-3 bg-black bg-opacity-50 text-white text-2xl rounded-full hover:bg-opacity-70"
            >
              ❮
            </button>
            <img
              src={hotelImages[currentIndex]}
              alt={`${name} view ${currentIndex + 1}`}
              className="w-full max-h-[600px] object-cover"
            />
            <button
              onClick={goToNextImage}
              className="absolute right-0 z-10 p-3 bg-black bg-opacity-50 text-white text-2xl rounded-full hover:bg-opacity-70"
            >
              ❯
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default HotelCard;

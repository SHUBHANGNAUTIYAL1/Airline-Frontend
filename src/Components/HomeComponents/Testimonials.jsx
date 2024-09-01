import React from 'react';

const testimonials = [
  {
    quote: "Booking my flights through this platform was seamless and stress-free. Highly recommended!",
    name: "Alex P.",
    image: 'https://www.softlinesolutions.com/wp-content/uploads/2022/05/ANDRE-PNG-768x768-1.png?text=A'
  },
  {
    quote: "I found the best deals for my vacation flights. The process was quick and easy!",
    name: "Emily R.",
    image: 'https://clipart-library.com/2023/woman-face-clipart-xl.png?text=E'
  },
  {
    quote: "The customer service was exceptional, and I felt well taken care of during the entire booking process.",
    name: "James W.",
    image: 'https://cdn.pixabay.com/photo/2024/01/23/08/08/man-8527031_960_720.png?text=J'
  }
];

const Testimonials = () => {
  return (
    <div className="w-full px-5">
      <div className="bg-green-50 p-6 flex items-center rounded-3xl">
        <div className="w-[60%] px-10">
          <h1 className="text-[45px] font-bold text-blue-900 mb-4">Travelers Trust Our Booking Platform</h1>
          <p className="text-blue-900 font-semibold mb-6">
            Discover how our platform is making air travel booking easier and more reliable. Hear from our satisfied travelers about their experiences and journeys.
          </p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md mb-8">Read the Success Stories</button>
        </div>
        <div className="w-[40%]">
          <div className="flex flex-col">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6">
                <p className="text-blue-600 text-xl leading-tight">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-4 flex items-center">
                  <img src={testimonial.image} alt="profile" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="text-gray-800 font-bold">{testimonial.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

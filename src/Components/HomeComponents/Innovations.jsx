import React from 'react';
import innovation1 from '../../assets/home/innovation1.jpg'
import innovation2 from '../../assets/home/innovation2.png'
import innovation3 from '../../assets/home/innovation3.png'


const Innovations = () => {
  return (
    <div className='w-full px-5 '>
    <div className="flex flex-col items-center bg-green-50 p-10 rounded-3xl">
      <h2 className="text-3xl font-bold mb-6">Our Innovations</h2>
      <p className="text-center mb-10">
        Discover the benefits you will enjoy when you add us to your online Farming Optimizing platform.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col  items-center text-center p-6 bg-white rounded-lg shadow-md">
          <img src={innovation2} alt="Expert Instruction" className="mb-4 h-[300px] w-full" />
          <h3 className="text-xl font-semibold mb-2">Expert Instruction</h3>
          <p>
            Access real-world expertise for valuable guidance and mentorship in our classroom.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
          <img src={innovation1} alt="Flexible Learning" className="mb-4 h-[300px] " />
          <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
          <p>
            Access online learning tailored to your schedule, available anywhere with internet.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
          <img src={innovation3} alt="Practical Skills Develop" className="mb-4 h-[300px]" />
          <h3 className="text-xl font-semibold mb-2">Practical Skills Develop</h3>
          <p>
            Acquire practical skills for real-world agricultural success.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Innovations;

import React from 'react';

function HeroSection() {
  return (
    <div className='w-full h-[600px] mt-4 px-5'>
      <div className="w-full h-full flex justify-between rounded-3xl bg-[#e0f7fa] relative">
        <div className='flex w-[50%] h-full justify-center flex-col px-10'>
          <h1 className="text-[60px] font-bold text-[#004225] font-serif">
            Your Journey Begins Here
          </h1>
          <p className="text-[26px] text-[#004225] font-semibold font-serif mt-2">
            Book flights to your favorite destinations with ease and convenience.
          </p>
          <button className="px-4 mt-10 py-3 w-[50%] rounded-lg bg-[#00563f] shadow-md text-white font-bold text-[20px]">
            Book Now
          </button>
        </div>
        <div className="w-[50%] h-full flex justify-end items-center">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/pilot-flying-an-airplane-and-waving-a-hand-2932741-2459135.png" alt="Airplane" className='mb-0 h-[500px]' />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

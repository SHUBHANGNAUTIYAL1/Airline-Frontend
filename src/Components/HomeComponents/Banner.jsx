import React from 'react';

function Banner() {
  return (
    <div className='w-full px-5'>
      <div className='w-full h-[450px] flex rounded-3xl bg-[#e0f7fa] relative'>
        <div className="w-[50%] flex h-full pt-10">
          <img src='https://png.pngtree.com/png-clipart/20230825/original/pngtree-pilot-cartoon-vector-illustration-with-airplane-picture-image_8679898.png' alt="Airplane" className="w-[90%]" />
        </div>
        <div className='w-[50%] flex py-10 items-center px-20 text-[#004225] flex-col z-20'>
          <h1 className="text-[40px] font-bold font-serif">
            Your Gateway to the Skies
          </h1>
          <p className="text-[20px] font-semibold font-serif mt-4">
            Discover the best deals and book your flights effortlessly. Whether you're planning a vacation or a business trip, we make booking flights simple and stress-free.
          </p>
          <div className='w-full flex'>
            <button className="px-4 mt-10 py-3 w-[50%] rounded-lg bg-[#00563f] text-white font-bold text-[20px]">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;

import React from 'react';

const Rating = () => {
  return (
    <div className="px-5 w-full">
      <div className="w-full mx-auto rounded-3xl bg-green-50 py-10 px-5 relative">
        <div className="flex w-full justify-between">
          <div className="w-[50%] flex gap-20 justify-center items-center">
            <div className="text-center">
              <h2 className="text-[40px] font-bold text-gray-900">15k</h2>
              <div className="mt-2 flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600 font-semibold">Active Travelers<br /><span className='text-blue-400 font-bold'>On Our Platform</span></p>
            </div>
            <div className="text-center">
              <h2 className="text-[40px] font-bold text-gray-900">4.8</h2>
              <div className="mt-2 flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.175 3.62a1 1 0 00.95.69h3.812c.969 0 1.372 1.24.588 1.81l-3.089 2.24a1 1 0 00-.364 1.118l1.175 3.62c.3.921-.755 1.688-1.54 1.118l-3.089-2.24a1 1 0 00-1.176 0l-3.089 2.24c-.784.57-1.838-.197-1.54-1.118l1.175-3.62a1 1 0 00-.364-1.118L2.489 9.047c-.784-.57-.38-1.81.588-1.81h3.812a1 1 0 00.95-.69l1.175-3.62z" />
                  </svg>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600 font-semibold">3,210 ratings<br /><span className='text-blue-500 font-bold'>Our Community</span></p>
            </div>
          </div>
          <div className="w-[50%] flex flex-col">
            <p className="text-[45px] font-serif text-left font-semibold text-gray-900 z-20">Trusted by 50,000+ happy travelers who book flights with us to reach their destinations</p>
            <div className="mt-4 flex justify-center gap-12 space-x-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-[70px] w-[70px] bg-blue-200 rounded-full flex items-center justify-center">
                  <svg className="h-[50px] w-[50px] text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.175 3.62a1 1 0 00.95.69h3.812c.969 0 1.372 1.24.588 1.81l-3.089 2.24a1 1 0 00-.364 1.118l1.175 3.62c.3.921-.755 1.688-1.54 1.118l-3.089-2.24a1 1 0 00-1.176 0l-3.089 2.24c-.784.57-1.838-.197-1.54-1.118l1.175-3.62a1 1 0 00-.364-1.118L2.489 9.047c-.784-.57-.38-1.81.588-1.81h3.812a1 1 0 00.95-.69l1.175-3.62z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      
        <img src="https://th.bing.com/th/id/R.13be6dcbb2b842054df0d9682ab0b271?rik=7e7tf8riZ4n%2fKQ&riu=http%3a%2f%2fclipart-library.com%2fimg%2f1814951.png&ehk=tGVJkjdDNrdZcZpGIxMQYz1sG6DHjxktcrxjagFXmZc%3d&risl=&pid=ImgRaw&r=0" className='absolute left-0 top-0 h-[100px]' alt="airplane" />
      </div>
    </div>
  );
}

export default Rating;

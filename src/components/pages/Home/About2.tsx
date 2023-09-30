import React from 'react';

function About2() {
  return (
    <>
      <div className='flex flex-col items-center py-8'>
        <div className='w-full flex justify-center items-center relative -mt-12 mb-12'>
          {/* Motion container content */}
        </div>
        <div className='m-0 p-0'>
          <h2 className='text-4xl font-medium text-center text-white'>
            See the difference
          </h2>
          <p className='text-base leading-relaxed font-normal text-center text-gray-400 mt-5 px-9'>
            Break free from creative constraints with our all-in-one platform.
            From idea to finished track, our powerful tools and user-friendly
            interface make music production effortless and fun.
          </p>
        </div>
        <div className='flex justify-center mt-5 w-3/4 text-center bg-blue-500 rounded-full p-4 cursor-pointer transition duration-300 ease-in-out hover:bg-black'>
          <button className='text-base font-medium text-white'>
            <p>Explore Tracks</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default About2;

import React from 'react';

const About3 = () => {
  return (
    <>
      <div className='flex flex-col items-center py-8'>
        <div className='flex flex-col items-center mt-8'>
          <h2 className='text-4xl font-medium text-center text-white'>
            Curated to inspire
          </h2>
          <p className='text-base leading-relaxed font-normal text-center text-gray-400 mt-5 px-9'>
            Experience the ultimate music discovery platform curated by industry
            experts. Our daily updates and mood-based categories make it easy to
            find the perfect sound to match your vision.
          </p>
        </div>
        <div className='flex justify-center mt-5 w-3/4 text-center bg-blue-500 rounded-full p-4 cursor-pointer transition duration-300 ease-in-out hover:bg-black'>
          <button className='text-base font-medium text-white'>
            <p>Explore Selections</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default About3;

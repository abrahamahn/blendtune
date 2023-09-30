import React from 'react';
import * as Icon from '@/components/common/icons';

const About = () => {
  return (
    <div className='flex flex-col items-center py-16'>
      <div className='text-center'>
        <h2 className='text-4xl font-medium text-white'>
          End of creative block
        </h2>
        <p className='mt-4 text-base font-light text-gray-400 px-8'>
          Unlock a new level of productivity. Say goodbye to endless scrolling
          and create standout tracks in record time.
        </p>
      </div>
      <div className='flex flex-wrap items-center justify-center mt-8'>
        <div className='flex flex-col items-center p-4 w-1/3 h-72'>
          <div className='flex items-center justify-center w-24 h-24 rounded-full bg-blue-200'>
            <Icon.Music width={50} height={50} />
          </div>
          <h3 className='mt-8 text-lg font-light text-white'>
            Unleash Creativity
          </h3>
          <p className='mt-2 text-sm text-gray-600'>
            Discover a world of creative possibilities at your fingertips.
            Create your track in one place.
          </p>
        </div>
        <div className='flex flex-col items-center p-4 w-1/3 h-72'>
          <div className='flex items-center justify-center w-24 h-24 rounded-full bg-yellow-200'>
            <Icon.Headphone width={50} height={50} />
          </div>
          <h3 className='mt-8 text-lg font-light text-white'>
            Superior Quality
          </h3>
          <p className='mt-2 text-sm text-gray-600'>
            Browse tracks from the world&apos;s top producers using our advanced
            filtering system.
          </p>
        </div>
        <div className='flex flex-col items-center p-4 w-1/3 h-72'>
          <div className='flex items-center justify-center w-24 h-24 rounded-full bg-red-200'>
            <Icon.Record width={50} height={50} />
          </div>
          <h3 className='mt-8 text-lg font-light text-white'>
            Record Your Voice
          </h3>
          <p className='mt-2 text-sm text-gray-600'>
            Use our built-in voice recorder to add your own unique vocals and
            create a masterpiece.
          </p>
        </div>
        <div className='flex flex-col items-center p-4 w-1/3 h-72'>
          <div className='flex items-center justify-center w-24 h-24 rounded-full bg-green-200'>
            <Icon.Volume width={50} height={50} />
          </div>
          <h3 className='mt-8 text-lg font-light text-white'>
            Advanced Filtering
          </h3>
          <p className='mt-2 text-sm text-gray-600'>
            Create a complete track with ease with our advanced vocal effects.
          </p>
        </div>
      </div>
      <div className='mt-4 w-3/4 text-center'>
        <button className='bg-blue-700 text-white rounded-full py-3 px-10 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600'>
          Start Creating
        </button>
      </div>
    </div>
  );
};

export default About;

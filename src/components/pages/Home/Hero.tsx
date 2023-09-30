import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className='flex flex-col justify-center items-center text-white relative w-full h-full overflow-hidden z-0'>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-1]'>
        <Image
          className='absolute top-0 left-0 w-full h-3/6 z-[-1]'
          src='/images/hero-image.jpg'
          alt='hero image'
          width='2000'
          height='800'
        />
      </div>
      <div className='flex flex-col justify-center items-center text-center mt-40 w-full h-full'>
        <div className='flex flex-col justify-center text-center w-4/5 mb-10 px-11'>
          <h1 className='font-custom text-6xl font-medium mb-2.5 px-5 mx-auto'>
            World&apos;s best web studio and music library.
          </h1>
          <p className='text-center text-neutral-400 text-xl w-3/6 mx-auto'>
            Create your masterpiece with highly-curated instrumentals, and share
            it with the world.
          </p>
        </div>
        <div className='flex justify-center'>
          <Link
            className='w-40 text-md text-white rounded-full py-4 px-10 mr-5 bg-neutral-800 hover:bg-neutral-900'
            href='/discover'
          >
            Explore
          </Link>
          <Link
            href='./login'
            className='w-40 text-md text-white rounded-full py-4 px-10 duration-300 bg-indigo-700 hover:bg-indigo-800'
          >
            Try Free
          </Link>
        </div>
      </div>
    </div>
  );
}

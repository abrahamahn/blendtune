import React from 'react';
import Logo from '@/components/common/shared/Logo';

const ConfirmSignUp: React.FC = () => {
  return (
    <div className='w-full h-full bg-opacity-80 bg-gray-500 dark:bg-gray-900'>
      <div className='w-80 lg:w-96 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30'>
        <div className='rounded-lg bg-neutral-100 dark:bg-gray-900 px-6 lg:py-8'>
          <div className='flex items-center pt-4 lg:pt-6 justify-center'>
            <Logo />
          </div>
          <div className='flex flex-col items-center mt-8'>
            <h1 className='hidden lg:flex text-base font-semibold text-black dark:text-white'>
              Check Your Email
            </h1>
          </div>
          <div className='flex flex-col items-center w-full rounded'>
            <p className='text-sm text-gray-500 w-full text-center'>
              Please confirm your email by going to your inbox.
            </p>
          </div>
          <button className='w-full mt-6 bg-indigo-600 text-white text-sm p-2 rounded-md cursor-pointer hover:bg-indigo-700'>
            Resend Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSignUp;

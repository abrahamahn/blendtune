'use client';
import React from 'react';
import Link from 'next/link';

const ResetPassword: React.FC = () => {
  const navigateToVerifyEmail = () => {
    if (typeof window !== 'undefined') {
      // Use window.location to navigate to /auth/verify-email on the client side
      window.location.href = '/auth/verify-email';
    }
  };

  return (
    <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-opacity-60 bg-gray-900 z-16'>
      <div className='w-96 rounded-lg bg-gray-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-18'>
        <div className='rounded-lg bg-gray-900 px-6 py-4'>
          <div className='flex items-center mt-8 justify-center'>
            <p className='text-3xl font-extrabold tracking-tighter'>BLEND.</p>
          </div>
          <div className='flex flex-col items-center justify-center w-full mt-5 mb-2'>
            <h1 className='text-1xl text-white mb-2 text-center'>
              Forgot Your Password?
            </h1>
          </div>
          <div className='flex flex-col items-center w-full mb-5 rounded'>
            <input
              type='email'
              placeholder='Email address'
              className='w-full bg-transparent text-gray-500 text-sm border border-gray-500 p-4 mb-2 rounded hover:border-indigo-500'
            />
          </div>
          <div>
            {' '}
            {/* Add a closing div tag here */}
            <button
              onClick={navigateToVerifyEmail}
              className='w-full bg-indigo-500 text-white text-base p-2 rounded mb-4 cursor-pointer hover:bg-indigo-700'
            >
              Continue
            </button>
          </div>{' '}
          {/* Close the div here */}
          <div className='flex items-center justify-start w-full text-sm mt-4'>
            <Link
              href='/auth/signin/'
              className='text-indigo-500 cursor-pointer hover:opacity-80'
            >
              Back to Sign In
            </Link>
          </div>
        </div>
        <div className='flex items-center justify-center w-full text-sm text-gray-500 bg-transparent p-10 mt-auto'>
          <p className='text-center mb-0 w-full'>
            By continuing, you agree to Blend&apos;s{' '}
            <Link href='/terms' className='text-indigo-500 hover:opacity-500'>
              Terms
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy-policy'
              className='text-indigo-500 hover:opacity-500'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const ResetPassword: React.FC = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/accounts/signin');
  };

  const handleCheckEmail = () => {
    router.push('/accounts/email');
  };

  return (
    <div className='flex flex-col items-center w-full h-screen'>
      <div className='flex flex-col items-center w-64 p-0 mt-16'>
        <div className='flex items-center justify-center w-full'>
          <p className='text-white text-5xl mb-2'>BLEND</p>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-5'>
          <h1 className='text-3xl text-white mb-2 text-center'>
            Forgot Your Password?
          </h1>
          <p className='text-sm text-gray-500 w-11/12 text-center mt-2 mb-6'>
            Enter your email address and we will send you instructions to reset
            your password.
          </p>
        </div>
        <div className='flex flex-col items-center w-60'>
          <div className='flex flex-col items-center w-full mb-5 rounded'>
            <input
              type='email'
              placeholder='Email address'
              className='w-full bg-transparent text-gray-500 text-sm border border-gray-500 p-4 rounded hover:border-orange-500'
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col items-start w-64'>
        <button
          onClick={handleCheckEmail}
          className='w-full bg-orange-500 text-white text-lg p-2 rounded mt-1 mb-4 cursor-pointer'
        >
          Continue
        </button>
        <div className='flex items-center justify-start w-full text-sm mb-5'>
          <a
            onClick={handleSignIn}
            className='text-orange-500 mt-5 cursor-pointer hover:opacity-80'
          >
            Back to Sign In
          </a>
        </div>
      </div>
      <div className='flex items-center justify-center w-64 text-sm text-gray-500 bg-transparent p-10 mt-auto'>
        <p className='text-center mb-5'>
          By continuing, you agree to Blend&apos;s{' '}
          <a href='#' className='text-orange-500 hover:opacity-80'>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href='#' className='text-orange-500 hover:opacity-80'>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;

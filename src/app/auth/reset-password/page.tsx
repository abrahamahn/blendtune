import React from 'react';
import Link from 'next/link';

const ResetPassword: React.FC = () => {
  return (
    <div className='flex flex-col items-center w-72 mx-auto h-screen'>
      <div className='flex flex-col items-center w-64 pt-16'>
        <div className='flex items-center justify-center w-full'>
          <p className='text-3xl font-extrabold tracking-tighter'>BLEND.</p>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-5 mb-6'>
          <h1 className='text-1xl text-white mb-2 text-center'>
            Forgot Your Password?
          </h1>
          <p className='text-sm text-gray-500 w-full text-center'>
            Enter your email address and we will send you instructions to reset
            your password.
          </p>
        </div>
        <div className='flex flex-col items-center w-full mb-5 rounded'>
          <input
            type='email'
            placeholder='Email address'
            className='w-full bg-transparent text-gray-500 text-sm border border-gray-500 p-4 mb-4 rounded hover:border-indigo-500'
          />
        </div>
        <Link
          href='/auth/verify-email'
          className='w-full bg-indigo-500 text-white text-base p-2 rounded mt-1 mb-4 cursor-pointer'
        >
          Continue
        </Link>
        <div className='flex items-center justify-start w-full text-sm'>
          <Link
            href='/auth/signin'
            className='text-indigo-500 cursor-pointer hover:opacity-80'
          >
            Back to Sign In
          </Link>
        </div>
      </div>
      <div className='flex items-center justify-center w-full text-sm text-gray-500 bg-transparent p-10 mt-auto'>
        <p className='text-center mb-0 w-full'>
          By continuing, you agree to Blend&apos;s{' '}
          <Link href='/' className='text-indigo-500 hover:opacity-500'>
            Terms
          </Link>{' '}
          and{' '}
          <Link href='/' className='text-indigo-500 hover:opacity-500'>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;

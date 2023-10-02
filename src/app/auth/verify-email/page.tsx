import React from 'react';
import Link from 'next/link';

const VerifyEmail: React.FC = () => {
  return (
    <div className='flex flex-col items-center w-72 mx-auto h-screen'>
      <div className='flex flex-col items-center w-64 pt-16'>
        <div className='flex items-center justify-center w-full'>
          <p className='text-3xl font-extrabold tracking-tighter'>BLEND.</p>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-5 mb-6'>
          <h1 className='text-1xl text-white mb-2 text-center'>
            Check Your Email
          </h1>
          <p className='text-sm text-gray-500 w-full text-center'>
            Please check the email address for instructions to reset your
            password.
          </p>
        </div>
        <button className='w-full bg-indigo-500 text-white text-base p-2 rounded mt-1 mb-4 cursor-pointer'>
          Resend Email
        </button>
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

export default VerifyEmail;

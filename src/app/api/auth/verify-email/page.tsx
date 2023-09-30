import React from 'react';

const Email: React.FC = () => {
  return (
    <div className='flex flex-col items-center w-full h-screen'>
      <div className='flex flex-col items-center w-64 p-0 mt-16'>
        <div className='flex items-center justify-center w-full'></div>
        <div className='flex flex-col items-center justify-center w-full'>
          <h1 className='mt-5 text-3xl text-white mb-2 text-center'>
            Check your Email
          </h1>
          <p className='text-sm text-gray-500 w-full text-center mt-2 mb-6'>
            Please check the email address for instructions to reset your
            password.
          </p>
        </div>
        <button className='w-full bg-orange-500 text-white text-lg p-2 cursor-pointer mt-1 rounded-md'>
          Resend Email
        </button>
      </div>
      <div className='flex items-center justify-center w-full mt-auto text-sm text-gray-500 bg-transparent p-10'>
        <p className='text-center mb-5'>
          By continuing, you agree to Blend&apos;s{' '}
          <a href='#' className='text-orange-500'>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href='#' className='text-orange-500'>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Email;

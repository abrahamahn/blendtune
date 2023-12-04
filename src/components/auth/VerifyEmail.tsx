import React from 'react';

interface VerifyEmailProps {
  openSignIn: () => void;
}

const VerifyEmail: React.FC<VerifyEmailProps> = () => {
  return (
    <div className='w-full h-screen bg-opacity-60 bg-gray-900'>
      <div className='w-96 rounded-lg bg-gray-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
        <div className='rounded-lg bg-gray-900 px-6 py-8'>
          <div className='flex items-center justify-center'>
            <p className='text-3xl font-extrabold tracking-tighter'>BLEND.</p>
          </div>
          <div className='text-xs text-center text-neutral-500 p-6'>
            <h1 className='text-base text-white'>Check your email</h1>
          </div>
          <div className='flex flex-col items-center w-full rounded'>
            <p className='text-sm text-gray-500 w-full text-center'>
              Please check inbox for further instruction.
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

export default VerifyEmail;

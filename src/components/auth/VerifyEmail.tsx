import React from 'react';

interface VerifyEmailProps {
  openSignIn: () => void;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ openSignIn }) => {
  return (
    <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-opacity-60 bg-gray-900 z-16'>
      <div className='w-96 rounded-lg bg-gray-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-18'>
        <div className='rounded-lg bg-gray-900 px-6 py-4'>
          <div className='flex items-center mt-8 justify-center'>
            <p className='text-3xl font-extrabold tracking-tighter'>BLEND.</p>
          </div>
          <div className='flex flex-col items-center justify-center w-full mt-5 mb-2'>
            <h1 className='text-1xl text-white mb-2 text-center'>
              Check Your Email
            </h1>
          </div>
          <div className='flex flex-col items-center w-full mb-5 rounded'>
            <p className='text-sm text-gray-500 w-full text-left'>
              Please check inbox for instruction to password reset.
            </p>
          </div>
          <button className='w-full bg-indigo-500 text-white text-base p-2 rounded mt-1 mb-4 cursor-pointer'>
            Resend Email
          </button>
          <div className='flex items-center justify-start w-full text-sm mt-2'>
            <a
              onClick={openSignIn}
              className='text-indigo-500 cursor-pointer hover:opacity-80'
            >
              Back to Sign In
            </a>
          </div>
        </div>
        <div className='flex items-center justify-center w-full text-sm text-gray-500 bg-transparent p-10 mt-auto'>
          <p className='text-center mb-0 w-full'>
            By continuing, you agree to Blend&apos;s{' '}
            <a href='/' className='text-indigo-500 hover:opacity-500'>
              Terms
            </a>{' '}
            and{' '}
            <a href='/' className='text-indigo-500 hover:opacity-500'>
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

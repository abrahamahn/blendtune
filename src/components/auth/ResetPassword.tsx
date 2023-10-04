import React from 'react';

interface ResetPasswordProps {
  openSignIn: () => void;
  openVerifyEmail: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  openSignIn,
  openVerifyEmail,
}) => {
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
            <button
              onClick={openVerifyEmail}
              className='w-full bg-indigo-500 text-white text-base p-2 rounded mb-4 cursor-pointer hover:bg-indigo-700'
            >
              Continue
            </button>
          </div>
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
          <p className='text-center w-full'>
            By continuing, you agree to Blend&apos;s{' '}
            <a
              href='/terms'
              target='_blank'
              className='text-indigo-500 hover:opacity-500 hover:opacity-80'
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              target='_blank'
              href='/privacy-policy'
              className='text-indigo-500 hover:opacity-500 hover:opacity-80'
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

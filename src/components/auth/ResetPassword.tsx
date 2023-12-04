import React from 'react';
import Link from 'next/link';

interface ResetPasswordProps {
  openSignIn: () => void;
  openVerifyEmail: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  openSignIn,
  openVerifyEmail,
}) => {
  return (
    <div className='w-full h-full bg-opacity-60 bg-gray-900'>
      <div className='w-96 rounded-lg bg-gray-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
        <div className='rounded-lg bg-gray-900 px-6 py-4'>
          <div className='flex items-center pt-6 justify-center'>
            <p className='text-3xl font-extrabold tracking-tighter'>BLEND.</p>
          </div>
          <div className='flex flex-col items-center mt-8'>
            <h1 className='text-base text-white'>Forgot Your Password?</h1>
          </div>
          <div className='w-full'>
            <input
              type='email'
              placeholder='Email Address'
              className='mt-4 w-full bg-transparent text-gray-500 text-sm border-gray-500 p-3 rounded-md hover:border-indigo-500'
            />
          </div>
          <div>
            {' '}
            {/* Add a closing div tag here */}
            <button
              onClick={openVerifyEmail}
              className='w-full mt-6 bg-indigo-600 text-white text-sm p-2 rounded-md cursor-pointer hover:bg-indigo-700'
            >
              Continue
            </button>
          </div>{' '}
          {/* Close the div here */}
          <div className='text-indigo-500 text-sm mt-4'>
            <a
              onClick={openSignIn}
              className='cursor-pointer hover:opacity-80 text-xs'
            >
              Back to Sign In
            </a>
          </div>
        </div>
        <div className='text-xs text-center text-neutral-500 p-6'>
          <p>
            By continuing, you agree to Blend&apos;s{' '}
            <Link href='/terms' className='text-indigo-500 hover:opacity-500'>
              Terms
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy-policy'
              className='text-indigo-500 hover:opacity-500'
            >
              Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

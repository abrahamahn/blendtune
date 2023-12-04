'use client';
import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

interface SignInProps {
  openSignIn: () => void;
  openSignUp: () => void;
  openResetPassword: () => void;
}

const SignIn: React.FC<SignInProps> = ({ openSignUp, openResetPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signInWithGoogle = async () => {};

  return (
    <div className='w-full h-full bg-opacity-60 bg-gray-900'>
      <div className='w-96 rounded-lg bg-gray-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
        <div className='rounded-lg bg-gray-900 px-6 py-4'>
          <div className='flex items-center pt-6 justify-center'>
            <p className='text-3xl font-extrabold tracking-tighter'>BLEND.</p>
          </div>
          <div className='flex flex-col items-center mt-8'>
            <h1 className='text-base text-white'>Log into your account</h1>
          </div>
          <button
            className='mt-4 flex items-center w-full bg-transparent border border-gray-500 text-white p-3 rounded-md cursor-pointer mb-2'
            onClick={signInWithGoogle}
          >
            <FcGoogle className='mr-3' />
            <p className='text-sm'>Continue with Google</p>
          </button>
          <div className='divider-container flex py-2 items-center justify-center w-full'>
            <div className='border-t border-gray-500 w-1/4 mb-2'></div>
            <span className='text-gray-500 text-sm mb-2 mx-2'>
              or sign in using email
            </span>
            <div className='border-t border-gray-500 w-1/4 mb-2'></div>
          </div>
          <div className='w-full'>
            <div className='flex flex-col items-center w-full mb-3 rounded'>
              <input
                type='email'
                placeholder='Email Address'
                className='w-full bg-transparent text-gray-500 text-sm border-gray-500 p-3 rounded-md hover:border-indigo-500'
              />
              <div className='relative w-full'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  className='mt-4 w-full bg-transparent text-gray-500 text-sm border-gray-500 p-3 rounded-md hover:border-indigo-500'
                />
                <div
                  className='absolute top-10 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end'>
            <a
              onClick={openResetPassword}
              className='ml-auto text--500 text-xs mb-2 cursor-pointer hover:opacity-80 text-indigo-500'
            >
              Forgot password?
            </a>
          </div>
          <button className='w-full bg-indigo-600 text-white text-sm p-2 rounded-md cursor-pointer hover:bg-indigo-700'>
            Continue
          </button>
          <div className='flex items-center justify-start w-full text-sm py-2 mt-1'>
            <p className='text-gray-500 text-xs'>Don&apos;t have an account?</p>
            <a
              onClick={openSignUp}
              className='text-indigo-500 ml-1 text-xs cursor-pointer hover:opacity-80'
            >
              Sign up
            </a>
          </div>
          <div className='text-xs text-center text-neutral-500 py-6 px-4'>
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
    </div>
  );
};

export default SignIn;

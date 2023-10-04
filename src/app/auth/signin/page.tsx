'use client';
import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signInWithGoogle = async () => {};

  return (
    <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-opacity-60 bg-gray-900 z-16'>
      <div className='w-96 rounded-lg bg-gray-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-18'>
        <div className='rounded-lg bg-gray-900 px-6 py-4'>
          <div className='flex items-center mt-8 justify-center'>
            <p className='text-3xl font-extrabold tracking-tighter'>BLEND.</p>
          </div>
          <div className='flex flex-col items-center justify-center w-full mt-5 mb-2'>
            <h1 className='text-1xl text-white mb-2 text-center'>
              Log into your account
            </h1>
          </div>
          <button
            className='flex items-center w-full bg-transparent border border-gray-500 text-white p-3 rounded cursor-pointer mb-2'
            onClick={signInWithGoogle}
          >
            <FcGoogle className='mr-2' />
            <p className='text-base'>Continue with Google</p>
          </button>
          <div className='divider-container flex py-2 items-center justify-center w-full'>
            <div className='border-t border-gray-500 w-1/4 mb-2'></div>
            <span className='text-gray-500 text-sm mb-2 mx-2'>
              or sign in using email
            </span>
            <div className='border-t border-gray-500 w-1/4 mb-2'></div>
          </div>
          <div className='flex flex-col items-center w-full'>
            <div className='flex flex-col items-center w-full mb-3 rounded'>
              <input
                type='email'
                placeholder='Email address'
                className='w-full bg-transparent text-gray-500 text-sm border border-gray-500 p-4 mb-4 rounded hover:border-indigo-500'
              />
              <div className='relative w-full'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  className='w-full bg-transparent text-gray-500 text-sm border border-gray-500 p-4 rounded hover:border-indigo-500'
                />
                <div
                  className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end'>
            <Link
              href='/auth/reset-password'
              className='ml-auto text--500 text-sm mb-2 cursor-pointer hover:opacity-80 text-indigo-500'
            >
              Forgot password?
            </Link>
          </div>
          <button className='w-full bg-indigo-500 text-white text-base p-2 rounded mt-1 mb-4 cursor-pointer hover:opacity-80'>
            Continue
          </button>
          <div className='flex items-center justify-start w-full text-sm mb-2'>
            <p className='text-gray-500 text-'>Don&apos;t have an account?</p>
            <Link
              href='/auth/signup/'
              className='text-indigo-500 ml-1 cursor-pointer hover:opacity-80'
            >
              Sign up
            </Link>
          </div>
          <div className='flex items-center justify-center w-full text-sm text-gray-500 bg-transparent mx-auto mt-0 p-6 bg-blue-500'>
            <p className='text-center w-full'>
              By continuing, you agree to Blend&apos;s{' '}
              <Link
                href='/terms'
                className='text-indigo-500 hover:opacity-500 hover:opacity-80'
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href='/privacy-policy'
                className='text-indigo-500 hover:opacity-500 hover:opacity-80'
              >
                Privacy Policy
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

'use client';
import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className='flex flex-col items-center w-72 mx-auto h-screen'>
      <div className='flex flex-col items-center w-64 pt-16'>
        <div className='flex items-center justify-center w-full'>
          <p className='text-3xl font-extrabold tracking-tighter'>BLEND.</p>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-5 mb-2'>
          <h1 className='text-1xl text-white mb-2 text-center'>
            Create your free account
          </h1>
        </div>
        <div className='flex flex-col items-center w-full'>
          <div className='flex flex-col items-center w-full mb-3 rounded'>
            <input
              type='email'
              placeholder='Email address'
              className='w-full bg-transparent text-gray-500 text-sm border border-gray-500 p-4 mb-4 rounded hover:border-indigo-500'
            />
            <div className='relative w-full mb-4'>
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
            <div className='relative w-full'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Confirm Password'
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
        <button className='w-full bg-indigo-500 text-white text-base p-2 rounded mt-1 mb-4 cursor-pointer'>
          Continue
        </button>
        <div className='flex items-center justify-start w-full text-sm mb-2'>
          <Link className='text-gray-500' href='/auth/signin'>
            Already have an account?
          </Link>
          <Link
            href='/auth/signin'
            className='text-indigo-500 ml-1 cursor-pointer hover:opacity-80'
          >
            Sign in
          </Link>
        </div>
        <div className='flex items-center justify-center w-full'>
          <span className='text-white text-sm mb-2'>OR</span>
        </div>
        <button className='flex items-center w-full bg-transparent border border-gray-500 text-white p-3 rounded cursor-pointer'>
          <FcGoogle className='mr-2' />
          <p className='text-base'>Continue with Google</p>
        </button>
      </div>
      <div className='flex items-center justify-center w-full text-sm text-gray-500 bg-transparent p-10 mt-2'>
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

export default SignUp;

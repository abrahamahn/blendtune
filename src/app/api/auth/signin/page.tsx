'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    router.push('/accounts/signup');
  };

  const handleForgotPassword = () => {
    router.push('/accounts/reset-password');
  };

  return (
    <div className='flex flex-col items-center w-full h-screen'>
      <div className='flex flex-col items-center w-64 pt-16'>
        <div className='flex items-center justify-center w-full'>
          <p className='text-white text-5xl mb-2'>BLEND</p>
        </div>
        <div className='flex flex-col items-center justify-center w-full mt-5'>
          <h1 className='text-3xl text-white mb-2 text-center'>
            Log into your account
          </h1>
        </div>
        <div className='flex flex-col items-center w-60'>
          <div className='flex flex-col items-center w-full mb-5 rounded'>
            <input
              type='email'
              placeholder='Email address'
              className='w-full bg-transparent text-gray-500 text-sm border border-gray-500 p-4 rounded hover:border-orange-500'
            />
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className='w-full bg-transparent text-gray-500 text-sm border border-gray-500 p-4 rounded hover:border-orange-500'
              />
              <div
                className='absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointer text-gray-500'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
          </div>
        </div>
        <div
          className='text-orange-500 text-sm mb-5 cursor-pointer hover:opacity-80'
          onClick={handleForgotPassword}
        >
          Forgot password?
        </div>
        <button className='w-full bg-orange-500 text-white text-lg p-2 rounded mt-1 mb-4 cursor-pointer'>
          Continue
        </button>
        <div className='flex items-center justify-start w-full text-sm mb-5'>
          <p className='text-gray-500 text-sm'>Don&apos;t have an account?</p>
          <a
            onClick={handleSignUp}
            className='text-orange-500 ml-1 cursor-pointer hover:opacity-80'
          >
            Sign up
          </a>
        </div>
        <div className='flex items-center justify-center w-full'>
          <span className='text-white text-sm'>OR</span>
        </div>
        <button className='flex items-center w-full bg-transparent border border-gray-500 text-white p-3 rounded cursor-pointer'>
          <FcGoogle className='mr-2' />
          Continue with Google
        </button>
      </div>
      <div className='flex items-center justify-center w-64 text-sm text-gray-500 bg-transparent p-10 mt-auto'>
        <p className='text-center mb-5'>
          By continuing, you agree to Blend&apos;s{' '}
          <a href='#' className='text-orange-500 hover:opacity-80'>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href='#' className='text-orange-500 hover:opacity-80'>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;

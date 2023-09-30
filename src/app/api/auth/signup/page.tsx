'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const router = useRouter();
  const handleSignIn = () => router.push('/accounts/signin');

  return (
    <div className='flex flex-col items-center w-full h-screen'>
      <div className='flex flex-col items-center w-64 p-0 pt-16'>
        <div className='flex items-center justify-center w-full'>
          <p className='text-5xl text-white mb-2'>BLEND</p>
        </div>
        <div className='flex flex-col items-center justify-center w-full'>
          <h1 className='w-full mt-5 text-lg text-white text-center'>
            Create your free account
          </h1>
          <p className='w-11/12 text-center mt-2 mb-4 text-sm text-gray-600'>
            You are two steps away to unleash your creativity in music.
          </p>
        </div>
        <div className='flex flex-col items-center w-[250px]'>
          <div className='flex flex-col items-center w-full mb-5 rounded-md'>
            <input
              type='email'
              placeholder='Email address'
              className='w-full bg-transparent text-gray-600 text-sm border rounded-md p-4'
            />
          </div>
          <div className='relative flex flex-col items-center w-full mb-5 rounded-md'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='w-full bg-transparent text-gray-600 text-sm border rounded-md p-4'
            />
            <div
              className='absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer text-gray-600'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-start w-64 p-0'>
        <button className='w-full bg-[#FF7B00] text-white text-lg rounded-md p-2 mt-[-0.125rem]'>
          Continue
        </button>
        <div className='flex items-center justify-start w-full text-sm mt-4'>
          <p className='text-gray-600'>Already have an account?</p>
          <a onClick={handleSignIn} className='text-[#FF7B00] ml-1'>
            Login
          </a>
        </div>
        <div className='flex items-center justify-center w-full mt-5'>
          <span className='text-white'>OR</span>
        </div>
        <button className='flex items-center justify-start w-full bg-transparent text-white border rounded-md p-3 mt-5'>
          <FcGoogle className='mr-2' />
          <p>Continue with Google</p>
        </button>
      </div>
      <div className='flex items-center justify-center w-[260px] text-sm bg-transparent py-5 px-10 mt-7'>
        <p className='text-gray-600 text-sm text-center mb-4 w-full'>
          By continuing, you agree to Blend&apos;s{' '}
          <a href='#' className='text-[#FF7B00]'>
            Terms of Service{' '}
          </a>
          and{' '}
          <a href='#' className='text-[#FF7B00]'>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;

'use client';
import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

interface SignUpProps {
  openSignIn: () => void;
  openSignUp: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ openSignIn, openSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [agreePolicy, setAgreePolicy] = useState(true);

  const togglePolicyButton = () => {
    setAgreePolicy(!agreePolicy);
  };

  return (
    <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-opacity-60 bg-gray-900'>
      <div className='w-96 rounded-lg bg-gray-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className=' flex justify-between w-full'>
          <button
            className={`w-1/2 py-6 bg-black font-bold text-white`}
            onClick={openSignIn}
          >
            Sign In
          </button>
          <button className={`w-1/2 py-6  text-white`} onClick={openSignUp}>
            Create Account
          </button>
        </div>
        <div className='rounded-lg bg-gray-900 px-6 py-4'>
          <div className='flex items-center mt-8 justify-center'>
            <p className='text-3xl font-extrabold tracking-tighter'>BLEND.</p>
          </div>
          <div className='flex flex-col items-center justify-center w-full mt-5 mb-2'>
            <h1 className='text-1xl text-white mb-2 text-center'>
              Create your free account
            </h1>
          </div>
          <button className='flex items-center w-full bg-transparent border border-gray-500 text-white p-3 rounded cursor-pointer mb-2'>
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
            <div className='flex flex-col items-center w-full mb-2 rounded'>
              <div className='flex flex-row items-center w-full mb-3'>
                <input
                  type='text'
                  placeholder='First Name'
                  className='w-full bg-transparent text-gray-500 text-sm border border-gray-500 p-4 rounded hover:border-indigo-500 mr-4'
                />
                <input
                  type='text'
                  placeholder='Last Name'
                  className='w-full bg-transparent text-gray-500 text-sm border border-gray-500 p-4 rounded hover:border-indigo-500'
                />
              </div>
              <input
                type='email'
                placeholder='Email address'
                className='w-full bg-transparent text-gray-500 text-sm border border-gray-500 p-4 mb-3 rounded hover:border-indigo-500'
              />
              <div className='relative w-full mb-3'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  className='w-full bg-transparent text-gray-500 text-sm border border-gray-500 p-4 mb-0 rounded hover:border-indigo-500'
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
                  className='w-full bg-transparent text-gray-500 text-sm border border-gray-500 p-4 mb-0 rounded hover:border-indigo-500'
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
          <p className='text-gray-500 text-xs mb-3'>
            Must be 8+ characters, with 1+ number and special character.
          </p>
          <div className='flex items-center w-full mb-3'>
            <div
              onClick={togglePolicyButton}
              className={`${
                agreePolicy
                  ? 'bg-indigo-500'
                  : 'bg-white border border-gray-400'
              } w-10 h-6 rounded-full p-1 flex items-center cursor-pointer mr-2 transition-colors duration-300`}
            >
              <div
                className={`${
                  agreePolicy ? 'bg-white' : 'bg-gray-500'
                } w-4 h-4 rounded-full transition-all duration-300 transform ${
                  agreePolicy ? 'translate-x-4' : 'translate-x-0'
                }`}
              ></div>
            </div>
            <div>
              <p className='text-white text-sm'>
                I agree to the{' '}
                <a
                  href='/terms'
                  target='_blank'
                  className='text-indigo-500 hover:text-indigo-800'
                >
                  Terms
                </a>{' '}
                and{' '}
                <a
                  href='/privacy-policy'
                  target='_blank'
                  className='text-indigo-500 hover:text-indigo-800'
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
          <button className='w-full text-white bg-indigo-500 text-base p-2 rounded my-2 cursor-pointer mb-4 hover:opacity-80'>
            Create Account
          </button>
          <div className='flex items-center justify-center w-full text-sm mb-2'>
            <p className='text-gray-500'>Already have an account?</p>
            <a
              onClick={openSignIn}
              className='text-indigo-500 ml-1 cursor-pointer hover:opacity-80'
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

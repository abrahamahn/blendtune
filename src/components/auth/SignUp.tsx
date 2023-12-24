'use client';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import Logo from '@/components/common/shared/Logo';

interface SignUpProps {
  openSignIn: () => void;
  openConfirmSignUp: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ openSignIn, openConfirmSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const supabase = createClientComponentClient();
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [agreePolicy, setAgreePolicy] = useState(true);

  const togglePolicyButton = () => {
    setAgreePolicy(!agreePolicy);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      setErrorMessage('Passwords do not match');
      return;
    }

    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordPattern.test(password)) {
      setPasswordMatch(false);
      setErrorMessage(
        'Password must be 8+ characters, with 1+ number and special character.'
      );
      return;
    }

    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
    openConfirmSignUp();
  };

  return (
    <div className='w-full h-full bg-opacity-80 bg-gray-500 dark:bg-gray-900'>
      <div className='w-80 lg:w-96 rounded-lg bg-gray-500 dark:bg-gray-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30'>
        <div className='rounded-lg bg-neutral-100 dark:bg-gray-900 px-6 lg:py-4'>
          <div className='flex items-center pt-4 lg:pt-6 justify-center'>
            <Logo />
          </div>
          <div className='flex flex-col items-center mt-8'>
            <h1 className='hidden lg:flex text-base font-semibold text-black dark:text-white'>
              Create your free account
            </h1>
          </div>
          <button className='mt-4 flex items-center w-full bg-transparent border border-gray-500 text-black dark:text-white p-3 rounded-md cursor-pointer mb-2'>
            <FcGoogle className='mr-3' />
            <p className='text-sm'>Continue with Google</p>
          </button>
          <div className='divider-container flex py-2 items-center justify-center w-full'>
            <div className='border-t border-gray-500 w-1/4 mb-2'></div>
            <span className='text-gray-500 text-xs lg:text-sm mb-2 mx-2'>
              or sign in using email
            </span>
            <div className='border-t border-gray-500 w-1/4 mb-2'></div>
          </div>
          <form
            className='flex flex-col items-center w-full'
            onSubmit={handleSignUp}
          >
            <div className='flex flex-col'>
              <div className='flex flex-row items-center w-full'>
                <input
                  type='text'
                  onChange={e => setFirstName(e.target.value)}
                  value={firstName}
                  placeholder='First Name'
                  className='w-full bg-transparent text-gray-500 text-sm border-gray-500 p-3 rounded-md hover:border-indigo-500 mr-3'
                />
                <input
                  type='text'
                  onChange={e => setLastName(e.target.value)}
                  value={lastName}
                  placeholder='Last Name'
                  className='w-full bg-transparent text-gray-500 text-sm border-gray-500 p-3 rounded-md hover:border-indigo-500'
                />
              </div>
              <input
                type='email'
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder='Email Address'
                autoComplete='new-password'
                className='mt-4 w-full bg-transparent text-gray-500 text-sm border-gray-500 p-3 rounded-md hover:border-indigo-500'
              />
              <div className='relative w-full'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  onChange={e => setPassword(e.target.value)}
                  placeholder='Password'
                  className='mt-4 w-full bg-transparent text-gray-500 text-sm border-gray-500 p-3 rounded-md hover:border-indigo-500'
                  autoComplete='new-password'
                />
                <div
                  className='absolute top-10 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </div>
              <div className='relative w-full'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder='Confirm Password'
                  className={`mt-4 w-full bg-transparent text-gray-500 text-sm border-gray-500 p-3 rounded-md hover:border-indigo-500 ${
                    !passwordMatch ? 'border-red-500' : ''
                  }`}
                  autoComplete='new-password'
                />
                <div
                  className='absolute top-10 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </div>
              {!passwordMatch && (
                <p className='text-red-500 text-xs mt-2'>{errorMessage}</p>
              )}
            </div>
            <p className='text-gray-500 text-2xs mt-3'>
              Must be 8+ characters, with 1+ number and special character.
            </p>
            <div className='flex items-center w-full mt-3'>
              <div
                onClick={togglePolicyButton}
                className={`${
                  agreePolicy
                    ? 'bg-indigo-600'
                    : 'bg-white border border-gray-400'
                } w-10 h-4 rounded-full p-1 flex items-center cursor-pointer mr-2 transition-colors duration-300`}
              >
                <div
                  className={`${
                    agreePolicy ? 'bg-white' : 'bg-gray-500'
                  } w-4 h-2.5 rounded-full transition-all duration-300 transform ${
                    agreePolicy ? 'translate-x-4' : 'translate-x-0'
                  }`}
                ></div>
              </div>
              <div>
                <p className='text-neutral-600 dark:text-white text-xs'>
                  I agree to the{' '}
                  <Link
                    href='/terms'
                    className='text-indigo-500 hover:text-indigo-800'
                  >
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link
                    href='/privacy-policy'
                    className='text-indigo-500 hover:text-indigo-800'
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
            <button
              type='submit'
              className='mt-4 w-full bg-indigo-600 text-white text-sm p-2 rounded-md cursor-pointer hover:bg-indigo-700'
            >
              Create Account
            </button>
          </form>

          <div className='flex items-center justify-center w-full text-xs p-6'>
            <p className='text-gray-500'>Already have an account?</p>
            <button
              onClick={openSignIn}
              className='text-indigo-500 ml-1 cursor-pointer hover:opacity-80'
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

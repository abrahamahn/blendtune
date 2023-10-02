import React from 'react';
import Link from 'next/link';
import { AiOutlineSearch, AiOutlineRight } from 'react-icons/ai';

interface HeaderProps {
  openAuthModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openAuthModal }) => {
  return (
    <nav className='sticky top-0 z-50 w-full h-16 p-2 bg-black border-b border-gray-800'>
      <div className='flex justify-between w-4/5 items-center mx-auto mt-2 px-4'>
        <div className='flex items-center space-x-6'>
          <Link className='text-3xl font-extrabold tracking-tighter' href='/'>
            BLEND.
          </Link>
          {/* Search Bar */}
          <div className='relative rounded-2xl w-30 border border-gray-500'>
            <input
              type='text'
              className='w-full top-0 h-8 pl-4 pr-8 rounded text-gray-800 bg-transparent'
              placeholder='Search...'
            />
            <div className='absolute inset-y-0 right-0 flex items-center px-2 '>
              {/* Search Icon */}
              <AiOutlineSearch
                width={16}
                height={16}
                className='text-gray-500'
              />
            </div>
          </div>
          <div className='flex items-center space-x-2 ml-8 mr-4'>
            <Link className='text-sm text-gray-400 ml-4 mr-4' href='/sounds'>
              Discover
            </Link>
            <Link className='text-sm text-gray-400 ml-4' href='/sounds'>
              Beats
            </Link>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <Link
            className='text-sm text-gray-400 bg-transparent px-4 py-1'
            href='/'
          >
            Pricing
          </Link>
          <a
            onClick={openAuthModal}
            className='text-sm text-gray-100 bg-gray-700 px-4 py-1 rounded-xl'
          >
            Sign In
          </a>
          <Link
            className='text-sm flex text-gray-100 px-4 py-1 bg-indigo-700 rounded-xl'
            href='/auth/signup'
          >
            Get Started
            <AiOutlineRight className='mt-1 ml-2' />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineRight } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faBars,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';

import SearchBar from '@/components/common/shared/SearchBar';
import Logo from '@/components/common/shared/Logo';
import DropdownMenu from '@/components/common/shared/Dropdown';
import MobileMenu from './MobileMenu';

const rotate180 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
`;

const ChevronIcon = styled(FontAwesomeIcon)`
  transition: transform 0.3s ease-in-out;
  &.rotate-180-animation {
    animation: ${rotate180} 0.3s ease-in-out forwards;
  }
`;

interface HeaderProps {
  openSignInModal: () => void;
  openSignUpModal: () => void;
}

const Header: React.FC<HeaderProps> = ({
  openSignInModal,
  openSignUpModal,
}) => {
  const [isSoundsHovered, setIsSoundsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to open the mobile menu
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSoundsHover = () => {
    setIsSoundsHovered(!isSoundsHovered);
  };

  return (
    <React.Fragment>
      {/* Desktop Menu */}
      <nav className='items-center justify-between hidden lg:block fixed top-0 z-50 w-full h-16 border-b  dark:border-slate-900 bg-white dark:bg-black'>
        <div className='flex items-center justify-between mx-auto w-full max-w-screen-xl 2xl:w-4/5 px-6 2xl:px-0'>
          <div className='flex items-center space-x-2 lg:space-x-4'>
            <Logo />
            {/* Search Bar */}
            <SearchBar />
            <div className='flex items-center'>
              {/* Container for "Sounds" text and icon */}
              <div className='relative group'>
                {' '}
                <Link
                  href='/sounds'
                  className='flex text-sm text-neutral-800 hover:text-neutral-700 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-800 px-2 lg:px-3 py-2 rounded-md'
                >
                  <p>Explore</p>
                </Link>
              </div>
              <div
                className='relative group h-full'
                onMouseEnter={() => setIsSoundsHovered(true)}
                onMouseLeave={() => setIsSoundsHovered(false)}
              >
                <div className='flex flex-row text-sm text-neutral-800 hover:text-neutral-700 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-800 px-1 lg:px-2 py-2 rounded-md'>
                  <p className='mr-2 hover:cursor-pointer'>Sounds</p>
                  <ChevronIcon
                    icon={faChevronUp}
                    size='xs'
                    className={`text-neutral-500 relative mt-1 ${
                      !isSoundsHovered ? 'rotate-180-animation' : ''
                    }`}
                  />
                </div>
                {isSoundsHovered && (
                  <DropdownMenu
                    isSoundsHovered={isSoundsHovered}
                    toggleSoundsHover={() => setIsSoundsHovered(true)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className='flex items-center space-x-2 lg:space-x-2'>
            <Link
              className='text-sm text-neutral-800 hover:text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300 px-1 lg:px-3 py-2 rounded-md'
              href='/'
            >
              Pricing
            </Link>
            <button
              onClick={openSignInModal}
              className='text-sm text-neutral-800 dark:text-neutral-200 dark:hover:text-neutral-200 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-700 py-1.5 px-4 rounded-full '
            >
              Sign in
            </button>
            <button
              onClick={openSignUpModal}
              className='flex flex-row text-sm text-neutral-100 py-1.5 px-4 bg-indigo-500 dark:bg-indigo-700 rounded-full dark:hover:bg-indigo-600'
            >
              Get started
              <AiOutlineRight className='lg:block mt-1 ml-2' />
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      <nav className='lg:hidden fixed top-0 z-20 w-full h-30 bg-white dark:bg-black dark:border-neutral-800 border-b '>
        <div className='flex flex-col items-center w-full px-2'>
          {/* First Row */}
          <div className='flex justify-between items-center w-full'>
            {/* Search Icon */}
            <button className='text-neutral-800 dark:text-white cursor-pointer bg-neutral-200 dark:bg-neutral-800 rounded-full px-3.5 py-2'>
              <FontAwesomeIcon
                icon={faSearch}
                size='sm'
                className='text-neutral-800 dark:text-white'
              />
            </button>
            {/* Logo */}
            <Logo />
            {/* Menu Icon */}
            <button
              onClick={openMobileMenu}
              className='text-neutral-800 dark:text-white cursor-pointer bg-neutral-200 dark:bg-neutral-800 rounded-full px-3.5 py-2'
            >
              <FontAwesomeIcon
                icon={faBars}
                size='sm'
                className='text-neutral-800 dark:text-white'
              />
            </button>
          </div>
          {/* Second Row */}
          <div className='flex w-full pb-1'>
            <div className='flex items-center mx-auto'>
              {/* Sounds */}
              <Link
                href='/sounds'
                className='text-sm text-neutral-800 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-200 px-3 py-2 rounded-md'
                onMouseEnter={toggleSoundsHover}
                onMouseLeave={toggleSoundsHover}
              >
                <p className='mr-1.5'>Sounds</p>
              </Link>
              <Link
                href='/studio'
                className='text-sm text-neutral-800 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-200 px-3 py-2 rounded-md'
              >
                <p className='mr-1.5'>Studio</p>
              </Link>
              {/* Pricing */}
              <Link
                className='text-sm text-neutral-800 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-200 px-3 py-2 rounded-md'
                href='/'
              >
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div>
        {isMobileMenuOpen && (
          <MobileMenu
            closeMenu={closeMobileMenu}
            openSignUpModal={openSignUpModal}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Header;

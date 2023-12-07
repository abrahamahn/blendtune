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
      <nav className='items-center justify-between hidden md:block fixed top-0 z-50 w-full h-16 border-b border-neutral-900 bg-black'>
        <div className='flex items-center justify-between mx-auto w-full 2xl:w-4/5 px-4 xl:px-6'>
          <div className='flex items-center space-x-2 lg:space-x-4'>
            <Logo />
            {/* Search Bar */}
            <SearchBar />
            <div className='flex items-center'>
              {/* Container for "Sounds" text and icon */}
              <div
                className='relative group'
                onMouseEnter={() => setIsSoundsHovered(true)}
                onMouseLeave={() => setIsSoundsHovered(false)}
              >
                <Link
                  href='/sounds'
                  className='flex flex-row text-sm text-neutral-400 hover:text-neutral-300 hover:bg-neutral-800 px-1 lg:px-2 py-2 rounded-md'
                >
                  <p className='mr-2'>Sounds</p>
                  <ChevronIcon
                    icon={faChevronUp}
                    size='xs'
                    className={`text-neutral-500 relative mt-1 ${
                      !isSoundsHovered ? 'rotate-180-animation' : ''
                    }`}
                  />
                </Link>
                {isSoundsHovered && (
                  <DropdownMenu
                    isSoundsHovered={isSoundsHovered}
                    toggleSoundsHover={() => setIsSoundsHovered(true)}
                  />
                )}
              </div>

              <div className='relative group'>
                {' '}
                <Link
                  href='/studio'
                  className='flex text-sm text-neutral-400 hover:text-neutral-300 hover:bg-neutral-800 px-2 lg:px-3 py-2 rounded-md'
                >
                  <p>Studio</p>
                </Link>
              </div>
            </div>
          </div>
          <div className='flex items-center space-x-2 lg:space-x-4'>
            <Link
              className='text-sm text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 rounded-md py-1.5 px-2 lg:px-3'
              href='/'
            >
              Pricing
            </Link>
            <button
              onClick={openSignInModal}
              className='text-sm text-neutral-100 bg-neutral-800 py-1.5 px-4 rounded-xl hover:bg-neutral-900'
            >
              Sign in
            </button>
            <button
              onClick={openSignUpModal}
              className='flex flex-row text-sm text-neutral-100 py-1.5 px-4 bg-indigo-700 rounded-xl hover:bg-indigo-500'
            >
              Get started
              <AiOutlineRight className='lg:block mt-1 ml-2' />
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      <nav className='md:hidden fixed top-0 z-20 w-full h-30 bg-black border-b border-neutral-800'>
        <div className='flex flex-col items-center w-full px-4'>
          {/* First Row */}
          <div className='flex justify-between items-center w-full'>
            {/* Search Icon */}
            <div className='text-white cursor-pointer bg-neutral-800 rounded-full px-3.5 py-2'>
              <FontAwesomeIcon icon={faSearch} size='sm' />
            </div>
            {/* Logo */}
            <Logo />
            {/* Menu Icon */}
            <div
              onClick={openMobileMenu}
              className='text-white cursor-pointer bg-neutral-800 rounded-full px-3.5 py-2'
            >
              <FontAwesomeIcon icon={faBars} size='sm' />
            </div>
          </div>
          {/* Second Row */}
          <div className='flex w-full pb-1'>
            <div className='flex items-center mx-auto'>
              {/* Sounds */}
              <Link
                href='/sounds'
                className='text-sm text-neutral-400 hover:text-neutral-200 px-3 py-2 rounded-md'
                onMouseEnter={toggleSoundsHover}
                onMouseLeave={toggleSoundsHover}
              >
                <p className='mr-1.5'>Sounds</p>
              </Link>
              <Link
                href='/studio'
                className='text-sm text-neutral-400 hover:text-neutral-200 px-3 py-2 rounded-md'
              >
                <p className='mr-1.5'>Studio</p>
              </Link>
              {/* Pricing */}
              <Link
                className='text-sm text-neutral-400 hover:text-neutral-200 py-2 px-3 rounded-md'
                href='/'
              >
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div>
        {isMobileMenuOpen && <MobileMenu closeMenu={closeMobileMenu} />}
      </div>
    </React.Fragment>
  );
};

export default Header;

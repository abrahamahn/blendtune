import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineRight } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';

import SearchBar from '@/components/common/shared/SearchBar';
import Logo from '@/components/common/shared/Logo';
import DropdownMenu from '@/components/common/shared/Dropdown';

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

  const toggleSoundsHover = () => {
    setIsSoundsHovered(!isSoundsHovered);
  };

  return (
    <nav className='fixed top-0 z-20 w-full h-16 p-2 bg-black border-b border-neutral-800'>
      <div className='-mt-1 flex justify-between xl:w-4/5 lg:w-full md:full items-center mx-auto px-4'>
        <div className='flex justify-between items-center space-x-6'>
          <Logo />
          {/* Search Bar */}
          <SearchBar />
          <div className='flex items-center space-x-0 mr-0'>
            {/* Container for "Sounds" text and icon */}
            <div className='relative group'>
              <Link
                href='/sounds'
                className='flex flex-row text-sm text-gray-400 hover:text-gray-300 hover:bg-neutral-800 px-2.5 py-1.5 rounded-md'
                onMouseEnter={toggleSoundsHover}
                onMouseLeave={toggleSoundsHover}
              >
                <p className='mr-1.5'>Sounds</p>
                <ChevronIcon
                  icon={isSoundsHovered ? faChevronUp : faChevronDown}
                  size='xs'
                  className={`text-neutral-500 relative mt-1 ${
                    isSoundsHovered ? 'rotate-180-animation' : ''
                  }`}
                />
              </Link>
              {isSoundsHovered && (
                <DropdownMenu
                  isSoundsHovered={isSoundsHovered}
                  toggleSoundsHover={toggleSoundsHover}
                />
              )}
            </div>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <Link
            className='text-sm text-gray-400 hover:bg-neutral-900 hover:text-gray-200 rounded-md py-1.5 px-3'
            href='/'
          >
            Pricing
          </Link>
          <button
            onClick={openSignInModal}
            className='text-sm text-gray-100 bg-neutral-800 py-1.5 px-4 rounded-2xl hover:bg-neutral-900'
          >
            Sign in
          </button>
          <button
            onClick={openSignUpModal}
            className='flex flex-row text-sm text-gray-100 py-1.5 px-4 bg-indigo-700 rounded-2xl hover:bg-indigo-500'
          >
            Get started
            <AiOutlineRight className='mt-1 ml-2' />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;

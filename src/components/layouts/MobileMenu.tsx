// MobileMenu.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faHeadphones,
  faArrowRight,
  faWandSparkles,
} from '@fortawesome/free-solid-svg-icons';

interface MobileMenuProps {
  closeMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ closeMenu }) => {
  return (
    <div className='fixed bottom-0 left-0 w-full z-50'>
      <div className='fixed inset-0 bg-neutral-600 opacity-40'></div>
      <div className='fixed bottom-0 left-0 w-full bg-black rounded-t-lg shadow-top'>
        <div className='bg-black p-4 pb-3 rounded-t-lg'>
          {/* First Row */}
          <div className='flex justify-between items-center'>
            <p className='text-white font-bold text-2xl'>Menu</p>
            <button
              onClick={closeMenu}
              className='bg-neutral-700 rounded-full py-2 px-3.5'
            >
              <FontAwesomeIcon icon={faTimes} className='text-white' />
            </button>
          </div>
        </div>
        <div className='bg-black'>
          {/* Second Row */}
          <div className='flex justify-between px-2'>
            <button className='font-semibold text-base flex-1 m-1 py-3 bg-neutral-700 rounded-3xl text-white'>
              Sign in
            </button>
            <button className='font-semibold text-base flex-1 m-1 py-3 bg-indigo-600 rounded-3xl text-white'>
              Get started
              <FontAwesomeIcon
                icon={faArrowRight}
                className='text-gray-300 ml-2'
              />
            </button>
          </div>
          {/* Third Row */}
          <div className='flex items-center py-4 px-4 border-b border-gray-700'>
            <FontAwesomeIcon
              icon={faHeadphones}
              className='text-xl text-gray-300 mr-4'
            />
            <p className='text-white'>Samples</p>
            <div className='flex-1'></div>
            <FontAwesomeIcon icon={faArrowRight} className='text-gray-300' />
          </div>
          {/* Fourth Row */}
          <div className='flex items-center py-4 px-4 border-b border-gray-100'>
            <FontAwesomeIcon
              icon={faWandSparkles}
              className='text-xl text-gray-300 mr-4'
            />
            <p className='text-white text-base'>Studio</p>
            <div className='flex-1'></div>
            <FontAwesomeIcon icon={faArrowRight} className='text-gray-300' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

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
      <div className='fixed inset-0 bg-neutral-700 opacity-40'></div>
      <div className='fixed bottom-0 left-0 w-full rounded-t-lg bg-black'>
        <div className='p-4 pb-3 rounded-t-xl bg-black'>
          {/* First Row */}
          <div className='flex justify-between items-center'>
            <p className='text-neutral-200 font-bold text-2xl'>Menu</p>
            <button
              onClick={closeMenu}
              className='bg-neutral-800 rounded-full py-2 px-3.5'
            >
              <FontAwesomeIcon icon={faTimes} className='text-white' />
            </button>
          </div>
        </div>
        <div>
          {/* Second Row */}
          <div className='flex justify-between px-2 font-semibold text-base text-white'>
            <button className='flex-1 m-1 py-3 bg-neutral-700 rounded-3xl hover:bg-neutral-800 text-neutral-200'>
              Sign in
            </button>
            <button className='flex-1 m-1 py-3 bg-indigo-600 rounded-3xl hover:bg-indigo-700 text-neutral-200'>
              Get started
              <FontAwesomeIcon
                icon={faArrowRight}
                className='text-gray-300 ml-2'
              />
            </button>
          </div>
          {/* Third Row */}
          <div className='flex items-center p-4 border-b border-neutral-800 hover:cursor-pointer font-semibold hover:bg-neutral-900 text-neutral-200'>
            <FontAwesomeIcon icon={faHeadphones} className='text-xl mr-4' />
            <p className='text-neutral-200'>Samples</p>
            <div className='flex-1'></div>
            <FontAwesomeIcon icon={faArrowRight} className='text-neutral-200' />
          </div>
          {/* Fourth Row */}
          <div className='flex items-center p-4 border-b border-neutral-800 hover:cursor-pointer font-semibold hover:bg-neutral-900 text-neutral-200'>
            <FontAwesomeIcon icon={faWandSparkles} className='text-xl mr-4' />
            <p className='text-neutral-200'>Studio</p>
            <div className='flex-1'></div>
            <FontAwesomeIcon icon={faArrowRight} className='text-neutral-200' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

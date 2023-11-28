// MobileMenu.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faHeadphones,
  faCogs,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

interface MobileMenuProps {
  closeMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ closeMenu }) => {
  return (
    <div className='fixed bottom-0 left-0 w-full z-50'>
      <div className='fixed inset-0 bg-gray-800 opacity-50'></div>
      <div className='fixed bottom-0 left-0 w-full bg-black rounded-t-lg shadow-top'>
        <div className='bg-black p-4 rounded-t-lg'>
          {/* First Row */}
          <div className='flex justify-between items-center'>
            <p className='text-white font-bold text-lg'>Menu</p>
            <button
              onClick={closeMenu}
              className='bg-gray-300 rounded-full p-2'
            >
              <FontAwesomeIcon icon={faTimes} className='text-gray-800' />
            </button>
          </div>
        </div>
        <div className='bg-black'>
          {/* Second Row */}
          <div className='flex justify-between'>
            <button className='flex-1 py-4 bg-gray-600 rounded-br-lg text-white'>
              Sign in
            </button>
            <button className='flex-1 py-4 bg-indigo-800 rounded-bl-lg text-white'>
              Get started
            </button>
          </div>
          {/* Third Row */}
          <div className='flex items-center py-4 px-4 border-b border-gray-700'>
            <FontAwesomeIcon
              icon={faHeadphones}
              className='text-gray-300 mr-2'
            />
            <p className='text-white'>Samples</p>
            <div className='flex-1'></div>
            <FontAwesomeIcon icon={faArrowRight} className='text-gray-300' />
          </div>
          {/* Fourth Row */}
          <div className='flex items-center py-4 px-4 border-b border-gray-700'>
            <FontAwesomeIcon icon={faCogs} className='text-gray-300 mr-2' />
            <p className='text-white'>Studio</p>
            <div className='flex-1'></div>
            <FontAwesomeIcon icon={faArrowRight} className='text-gray-300' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

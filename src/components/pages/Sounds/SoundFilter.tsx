// SoundFilter.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faChevronDown,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

const SoundFilter: React.FC = () => {
  return (
    <div className='fixed mt-8 lg:mt-0 z-30 w-full py-1 lg:py-2 bg-black items-center'>
      <div className='max-w-screen-xl mx-auto px-2 lg:px-6'>
        <div className='lg:flex-row lg:flex justify-between items-center w-full hidden'>
          <div className='flex flex-row'>
            <div className='mr-2'>
              <button className='flex flex-row px-3 py-1.5 bg-neutral-800 text-neutral-300 border border-neutral-600 hover:border-neutral-500 rounded-lg'>
                <p className='text-2xs mr-1.5'>Tempo</p>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size='2xs'
                  className='cursor-pointer hover:opacity-75 mt-0.5'
                />
              </button>
            </div>
            <div className='mr-2'>
              <button className='flex flex-row px-3 py-1.5 bg-neutral-800 text-neutral-300 border border-neutral-600 hover:border-neutral-500 rounded-lg'>
                <p className='text-2xs mr-1.5'>Key</p>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size='2xs'
                  className='cursor-pointer hover:opacity-75 mt-0.5'
                />
              </button>
            </div>
            <div className='mr-2'>
              <button className='flex flex-row px-3 py-1.5 bg-neutral-800 text-neutral-300 border border-neutral-600 hover:border-neutral-500 rounded-lg'>
                <p className='text-2xs mr-1.5'>Genre</p>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size='2xs'
                  className='cursor-pointer hover:opacity-75 mt-0.5'
                />
              </button>
            </div>
            <div className='mr-2'>
              <button className='flex flex-row px-3 py-1.5 bg-neutral-800 text-neutral-300 border border-neutral-600 hover:border-neutral-500 rounded-lg'>
                <p className='text-2xs mr-1.5'>Artist</p>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size='2xs'
                  className='cursor-pointer hover:opacity-75 mt-0.5'
                />
              </button>
            </div>
            <div className='mr-2'>
              <button className='flex flex-row px-3 py-1.5 bg-neutral-800 text-neutral-300 border border-neutral-600 hover:border-neutral-500 rounded-lg'>
                <p className='text-2xs mr-1.5'>Mood</p>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size='2xs'
                  className='cursor-pointer hover:opacity-75 mt-0.5'
                />
              </button>
            </div>
            <div className='mr-2'>
              <button className='flex flex-row px-3 py-1.5 bg-neutral-800 text-neutral-300 border border-neutral-600 hover:border-neutral-500 rounded-lg'>
                <p className='text-2xs mr-1.5'>Keyword</p>
                <FontAwesomeIcon
                  icon={faPlus}
                  size='2xs'
                  className='cursor-pointer hover:opacity-75 mt-0.5'
                />
              </button>
            </div>
          </div>
          <div className='flex'>
            <button className='flex flex-row py-1.5 px-4 mb-1 bg-transparent border rounded-full border-neutral-600 hover:border-neutral-500 text-neutral-300'>
              <p className='text-2xs mr-1.5'>Sort by: </p>
              <p className='text-semibold text-2xs mr-1.5'>Popular</p>
              <FontAwesomeIcon
                icon={faChevronDown}
                size='2xs'
                className='cursor-pointer hover:opacity-75 mt-0.5'
              />
            </button>
          </div>
        </div>
        <div className='w-full p-1 block lg:hidden'>
          <button className='w-full text-sm p-1 font-semibold text-white bg-indigo-600 hover:bg-violet-500 rounded-full'>
            <FontAwesomeIcon
              icon={faFilter}
              className='cursor-pointer hover:opacity-75 mt-1 mr-2'
            />
            Filter & Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundFilter;

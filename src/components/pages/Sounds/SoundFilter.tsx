import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ArtistFilter,
  GenreFilter,
  InstrumentFilter,
  KeyFilter,
  KeywordFilter,
  MoodFilter,
  TempoFilter,
} from '@/components/common/filters';

import {
  faFilter,
  faChevronDown,
  faChevronUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

const SoundFilter: React.FC = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const toggleFilter = (filterName: string) => {
    if (openFilter === filterName) {
      setOpenFilter(null);
    } else {
      setOpenFilter(filterName);
    }
  };

  return (
    <div className='fixed mt-8 lg:mt-0 z-30 w-full py-1 lg:py-2 bg-neutral-50 dark:bg-black items-center border-b-0 border-neutral-100'>
      <div className='max-w-screen-xl mx-auto px-2 lg:px-6'>
        <div className='lg:flex-row lg:flex justify-between items-center w-full hidden'>
          <div className='flex flex-row'>
            {[
              { name: 'Tempo', component: <TempoFilter /> },
              { name: 'Key', component: <KeyFilter /> },
              { name: 'Genre', component: <GenreFilter /> },
              { name: 'Artist', component: <ArtistFilter /> },
              { name: 'Instrument', component: <InstrumentFilter /> },
              { name: 'Mood', component: <MoodFilter /> },
              { name: 'Keyword', component: <KeywordFilter /> },
            ].map(({ name, component }) => (
              <div className='mr-2' key={name}>
                <button
                  className={`flex flex-row px-3 py-1.5 bg-transparent dark:bg-neutral-800 text-neutral-500 dark:text-neutral-300 border rounded-lg ${
                    openFilter === name
                      ? 'border-indigo-500'
                      : 'border-neutral-400 hover:border-neutral-300 dark:border-neutral-600 dark:hover:border-neutral-500'
                  }`}
                  onClick={() => toggleFilter(name)}
                >
                  <p className='text-2xs mr-1.5'>{name}</p>
                  {name === 'Keyword' && (
                    <FontAwesomeIcon
                      icon={faPlus}
                      size='2xs'
                      className={`cursor-pointer mt-0.5 ${
                        openFilter === name ? 'chevron-up' : 'chevron-down'
                      }`}
                    />
                  )}
                  {name !== 'Keyword' && (
                    <FontAwesomeIcon
                      icon={openFilter === name ? faChevronUp : faChevronDown}
                      size='2xs'
                      className={`cursor-pointer mt-0.5 ${
                        openFilter === name ? 'chevron-up' : 'chevron-down'
                      }`}
                    />
                  )}
                </button>
                {openFilter === name && <div>{component}</div>}
              </div>
            ))}
          </div>
          <div className='flex'>
            <button className='flex flex-row py-1.5 px-4 mb-1 bg-transparent border rounded-full border-neutral-500 hover:border-neutral-400 dark:border-neutral-600 dark:hover:border-neutral-500 text-neutral-500 dark:text-neutral-300'>
              <p className='text-2xs mr-1.5'>Sort by: </p>
              <p className='text-semibold text-2xs mr-1.5'>Popular</p>
              <FontAwesomeIcon
                icon={faChevronDown}
                size='2xs'
                className='cursor-pointer mt-0.5'
              />
            </button>
          </div>
        </div>
        <div className='w-full sm:w-36 ml-auto p-1 block lg:hidden'>
          <button className='w-full text-sm p-1 font-semibold text-white bg-indigo-500 hover:bg-indigo-400 dark:bg-indigo-600 dark:hover:bg-violet-500 rounded-full'>
            <FontAwesomeIcon
              icon={faFilter}
              className='cursor-pointer mt-1 mr-2'
            />
            Filter & Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundFilter;

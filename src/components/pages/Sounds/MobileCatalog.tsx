'use client';
import React from 'react';
import Image from 'next/image';
import * as Icon from '@/components/common/icons';
import { Track } from '@/types/track';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';

import { faHeart } from '@fortawesome/free-regular-svg-icons';

export interface MobileCatalogProps {
  tracks: Track[];
  playTrack: (track: Track) => void;
  isPlaying: boolean;
}

const MobileCatalog: React.FC<MobileCatalogProps> = ({
  tracks,
  playTrack,
  isPlaying,
}) => {
  function renderValue(value: string) {
    return value && value !== 'n/a' && value !== '' ? value : null;
  }

  if (!tracks) {
    return null;
  }

  return (
    <div className='w-full pt-20 lg:pt-12 justify-center items-center mx-auto'>
      <div className='flex max-w-screen-xl pl-2 lg:px-4 mx-auto flex-col relative'>
        {tracks.map((track: Track) => (
          <div
            key={track.id}
            className='flex p-1 border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 group dark:hover:bg-neutral-900 justify-center items-center rounded-lg pr-12 z-10'
            onClick={() => playTrack(track)}
          >
            <div className=' w-20 md:w-16 h-14 p-1 md:p-0.5 transition-transform duration-300 ease-in-out rounded-md group-hover:scale-105 mt-1'>
              <Image
                src={`/images/artwork/${track.metadata.catalog}.jpg`}
                alt={track.metadata.title}
                className='rounded-md object-center object-cover w-full h-full'
                width={50}
                height={50}
              />
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                {isPlaying ? (
                  <Icon.Pause width={20} height={20} fill='white' />
                ) : (
                  <Icon.Play width={20} height={20} fill='white' />
                )}
              </div>
            </div>
            <div className='flex flex-row justify-between w-full ml-2'>
              <div className='flex-start flex-col cursor-pointer dark:border-neutral-800 pt-1'>
                <div className='md:ml-1 text-left text-xs md:text-sm text-neutral-800 dark:text-neutral-300 font-semibold'>
                  <h3>{renderValue(track.metadata.title)}</h3>
                </div>
                <div className='cursor-pointer md:flex flex-row text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white text-left text-2xs md:text-xs w-auto md:w-auto md:ml-1'>
                  {renderValue(track.metadata.producer) && (
                    <p>{renderValue(track.metadata.producer)}</p>
                  )}
                </div>
              </div>

              <div className='flex flex-col justify-center items-center'>
                <div className='ml-auto justify-end text-black dark:text-white text-2xs md:text-xs mr-0'>
                  {renderValue(track.info.genre[1].maingenre) && (
                    <p className='inline-block bg-blue-200 dark:bg-blue-900 mr-1 px-2 py-0.5 rounded-md overflow-hidden'>
                      {renderValue(track.info.genre[1].maingenre)}
                    </p>
                  )}
                  {renderValue(track.info.key.note) &&
                    renderValue(track.info.key.scale.substring(0, 3)) && (
                      <p className='inline-block bg-neutral-200 dark:bg-neutral-800 mr-1 px-2 py-0.5 rounded-md overflow-hidden'>
                        {renderValue(track.info.key.note)}
                        {renderValue(track.info.key.scale.substring(0, 3))}
                      </p>
                    )}
                  {renderValue(track.info.bpm) && (
                    <p className='inline-block bg-gray-200 dark:bg-gray-900 px-2 py-0.5 rounded-md overflow-hidden'>
                      {renderValue(track.info.bpm)}
                    </p>
                  )}
                </div>
                <div className='flex flex-row ml-auto text-center text-2xs md:text-xs w-auto'>
                  {renderValue(track.info.mood.mood1) && (
                    <p className='px-1 cursor-pointer text-neutral-600 hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-white'>
                      {renderValue(track.info.mood.mood1)}
                    </p>
                  )}
                  {renderValue(track.info.mood.mood2) && (
                    <p className='px-1 cursor-pointer text-neutral-600 hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-white'>
                      {renderValue(track.info.mood.mood2)}
                    </p>
                  )}
                  {renderValue(track.info.mood.mood3) && (
                    <p className='px-1 cursor-pointer text-neutral-600 hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-white'>
                      {renderValue(track.info.mood.mood3)}
                    </p>
                  )}
                  {renderValue(track.info.mood.energy) && (
                    <p className='px-1 cursor-pointer text-neutral-600 hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-white'>
                      {renderValue(track.info.mood.energy)}
                    </p>
                  )}
                  {renderValue(track.info.mood.color) && (
                    <p className='px-1 cursor-pointer text-neutral-600 hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-white'>
                      {renderValue(track.info.mood.color)}
                    </p>
                  )}
                  {renderValue(track.info.mood.character) && (
                    <p className='px-1 cursor-pointer text-neutral-600 hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-white'>
                      {renderValue(track.info.mood.character)}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className='absolute flex right-0 lg:right-6 items-center group-hover:shadow-3xl group-hover:shadow-neutral-100 dark:group-hover:shadow-neutral-900 '>
              <div className='text-neutral-500 group-hover:bg-neutral-100 dark:text-neutral-300 p-3 dark:group-hover:bg-neutral-900'>
                <FontAwesomeIcon
                  icon={faHeart}
                  className='invisible group-hover:visible '
                />
              </div>
              <div className='text-neutral-500 group-hover:bg-neutral-100 dark:text-neutral-300 p-3 dark:group-hover:bg-neutral-900'>
                <FontAwesomeIcon
                  icon={faPlus}
                  className='invisible group-hover:visible'
                />
              </div>
              <div className='dark:text-white text-neutral-500 flex justify-center p-3 mr-1'>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCatalog;

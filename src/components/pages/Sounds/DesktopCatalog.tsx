'use client';
import React from 'react';
import Image from 'next/image';
import * as Icon from '@/components/common/icons';
import { Track } from '@/types/track';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';

import { faHeart } from '@fortawesome/free-regular-svg-icons';

export interface DesktopCatalogProps {
  tracks: Track[];
  playTrack: (track: Track) => void;
  isPlaying: boolean;
  openTrackInfo: () => void;
}

const DesktopCatalog: React.FC<DesktopCatalogProps> = ({
  tracks,
  playTrack,
  isPlaying,
  openTrackInfo,
}) => {
  function renderValue(value: string) {
    return value && value !== 'n/a' && value !== '' ? value : null;
  }

  function formatDuration(duration: string) {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    let formattedDuration = '';

    if (hours > 0) {
      formattedDuration += hours.toString().padStart(2, '0') + ':';
    }

    formattedDuration +=
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0');

    return formattedDuration;
  }

  if (!tracks) {
    return null;
  }

  return (
    <div className='w-full pt-20 lg:pt-12 justify-center items-center mx-auto'>
      <div className='flex max-w-screen-xl pl-2 lg:px-4 mx-auto flex-col relative'>
        {tracks.map((track: Track, index: number) => (
          <div
            key={track.id}
            className='flex p-1 border-neutral-300 hover:bg-neutral-100 dark:border-neutral-900 group dark:hover:bg-neutral-900 border-b justify-center items-center rounded-lg relative h-18'
            onClick={() => playTrack(track)}
          >
            {/* Numbering*/}
            <div className='text-neutral-500 mr-4 w-8 h-8 justify-center items-center flex'>
              <p className='text-sm group-hover:opacity-0'>{index + 1}</p>
              <div className='absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                {isPlaying ? (
                  <Icon.Pause width={20} height={20} fill='white' />
                ) : (
                  <Icon.Play width={20} height={20} fill='white' />
                )}
              </div>
            </div>
            {/* Artwork */}
            <div className='w-20 h-16 md:p-0.5 transition-transform duration-300 ease-in-out rounded-md group-hover:scale-105'>
              <Image
                src={`/images/artwork/${track.metadata.catalog}.jpg`}
                alt={track.metadata.title}
                className='rounded-md object-center object-cover w-full h-full'
                width={50}
                height={50}
              />
            </div>
            {/* Title and Producer*/}
            <div className='flex flex-row justify-between w-full ml-2'>
              <div className='flex-start flex-col justify-center items-center cursor-pointer w-5/12 dark:border-neutral-800 ml-1'>
                <div className='mt-2 text-left text-2xs md:text-sm text-neutral-800 dark:text-neutral-300 font-semibold'>
                  <button onClick={openTrackInfo} className='hover:underline '>
                    {renderValue(track.metadata.title)}
                  </button>
                </div>
                <div className='cursor-pointer md:flex flex-row text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white text-2xs md:text-2xs w-auto md:w-auto '>
                  {renderValue(track.metadata.producer) && (
                    <p className='hover:underline'>
                      {renderValue(track.metadata.producer)}
                    </p>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-5 items-center justify-center gap-8 w-64 mr-2'>
                <div className='col-span-1'>
                  <div className='mr-8 justify-center items-center'>
                    <p className='text-black dark:text-neutral-400 text-2xs'>
                      {renderValue(formatDuration(track.info.duration))}
                    </p>
                  </div>
                </div>
                <div className='col-span-1'>
                  <div className='justify-center items-center'>
                    <p className='text-black dark:text-neutral-400 text-2xs'>
                      {renderValue(track.info.bpm)}
                    </p>
                  </div>
                </div>
                <div className='col-span-1'>
                  <div className='flex justify-center items-center'>
                    <p className='text-center text-white bg-blue-200 dark:bg-neutral-900 text-2xs px-2 py-0.5 rounded-md w-auto'>
                      {renderValue(track.info.key.note)}
                      {renderValue(
                        track.info.key.scale.substring(0, 3).toLowerCase()
                      )}
                    </p>
                  </div>
                </div>
                <div className='flex-col col-span-2'>
                  {renderValue(track?.info?.genre[0]?.maingenre) && (
                    <div className='flex justify-center items-center'>
                      <p className='text-center text-white bg-blue-200 dark:bg-blue-900 text-2xs px-2 py-0.5 mb-1 rounded-md w-auto'>
                        {renderValue(track.info.genre[0].maingenre)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className='p-2 grid grid-cols-3 grid-rows-2 gap-2 w-64 bg-neutral-100 dark:bg-neutral-900/60 rounded-md justify-center items-center'>
                <div className='col-span-1 row-span-1'>
                  <div className='flex flex-row justify-center items-center text-center text-2xs md:text-2xs w-full'>
                    {renderValue(track.info.relatedartist[0]) && (
                      <p className='px-1 mr-1 cursor-pointer text-neutral-600 hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-white overflow-hidden whitespace-nowrap marquee'>
                        {renderValue(track.info.relatedartist[0])}
                      </p>
                    )}
                  </div>
                </div>
                <div className='col-span-1 row-span-1'>
                  <div className='flex flex-row justify-center items-center text-center text-2xs md:text-2xs w-full'>
                    {renderValue(track.info.relatedartist[1]) && (
                      <p className='px-1 cursor-pointer text-neutral-600 hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-white overflow-hidden whitespace-nowrap marquee'>
                        {renderValue(track.info.relatedartist[1])}
                      </p>
                    )}
                  </div>
                </div>
                <div className='col-span-1 row-span-1'>
                  <div className='flex flex-row justify-center items-center text-center text-2xs md:text-2xs w-full'>
                    {renderValue(track.info.mood[0]) && (
                      <p className='px-1 mr-1 cursor-pointer text-neutral-600 hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-white overflow-hidden whitespace-nowrap marquee'>
                        {renderValue(track.info.mood[0])}
                      </p>
                    )}
                  </div>
                </div>
                <div className='col-span-1 row-span-1'>
                  <div className='flex flex-row justify-center items-center text-center text-2xs md:text-2xs w-full'>
                    {renderValue(track.info.mood[1]) && (
                      <p className='px-1 cursor-pointer text-neutral-600 hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-white overflow-hidden whitespace-nowrap marquee'>
                        {renderValue(track.info.mood[1])}
                      </p>
                    )}
                  </div>
                </div>
                <div className='col-span-1 row-span-1'>
                  <div className='flex flex-row justify-center items-center text-center text-2xs md:text-2xs w-full'>
                    {renderValue(track.info.mood[2]) && (
                      <p className='px-1 cursor-pointer text-neutral-600 hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-white overflow-hidden whitespace-nowrap marquee'>
                        {renderValue(track.info.mood[2])}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex justify-center items-center flex-grow relative'>
                <div className='flex justify-center items-center text-neutral-500 dark:text-neutral-300 w-8 h-8 mr-2 bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full opacity-0 group-hover:opacity-100 hover:cursor-pointer'>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <div className='flex justify-center items-center text-neutral-500 dark:text-neutral-300 w-8 h-8 mr-2 bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full opacity-0 group-hover:opacity-100 hover:cursor-pointer'>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
                <div className='flex justify-center items-center text-neutral-500 dark:text-neutral-300 w-8 h-8 bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full opacity-0 group-hover:opacity-100 hover:cursor-pointer'>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopCatalog;

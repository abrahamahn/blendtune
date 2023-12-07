'use client';
import React from 'react';
import Image from 'next/image';
import * as Icon from '@/components/common/icons';
import { Track } from '@/types/track';

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
    <div className='w-full md:w-4/6 mx-auto mt-24 md:mt-16 px-1'>
      <div className='flex flex-col relative'>
        {tracks.map((track: Track) => (
          <div
            key={track.id}
            className='z-10 flex px-2 border-b border-neutral-800 group hover:bg-neutral-900 '
            onClick={() => playTrack(track)}
          >
            <div className='z-10 w-20 md:w-16 h-14 p-1 md:p-0.5 transition-transform duration-300 ease-in-out rounded-md group-hover:scale-105 mt-1'>
              <Image
                src={`/images/artwork/${track.metadata.catalog}.jpg`}
                alt={track.metadata.title}
                className='z-20 rounded-md object-center object-cover w-full h-full'
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
            <div className='flex flex-col w-full ml-3'>
              <div className='flex border-b mt-0.5 border-neutral-800 py-1'>
                <div className='md:ml-1 absolute w-auto items-left text-sm text-neutral-300'>
                  <h3>{renderValue(track.metadata.title)}</h3>
                </div>
                <div className='ml-auto justify-end text-white text-2xs md:text-xs mr-0'>
                  {renderValue(track.info.genre[1].maingenre) && (
                    <p className='inline-block bg-blue-900 mr-1 px-2 py-0.5 rounded-md overflow-hidden'>
                      {renderValue(track.info.genre[1].maingenre)}
                    </p>
                  )}
                  {renderValue(track.info.key.note) &&
                    renderValue(track.info.key.scale.substring(0, 3)) && (
                      <p className='inline-block bg-neutral-800 mr-1 px-2 py-0.5 rounded-md overflow-hidden'>
                        {renderValue(track.info.key.note)}
                        {renderValue(track.info.key.scale.substring(0, 3))}
                      </p>
                    )}
                  {renderValue(track.info.bpm) && (
                    <p className='inline-block bg-gray-900 px-2 py-0.5 rounded-md overflow-hidden'>
                      {renderValue(track.info.bpm)}
                    </p>
                  )}
                </div>
              </div>
              <div className='flex flex-row justify-between items center py-1 w-full h-full'>
                <div className='hidden md:flex flex-row justify-start text-neutral-400 hover:text-white text-center text-2xs md:text-xs w-auto md:w-auto'>
                  {renderValue(track.info.genre[1].subgenre) && (
                    <p className='px-1 overflow-x-hidden'>
                      {renderValue(track.info.genre[1].subgenre)}
                    </p>
                  )}
                  {renderValue(track.info.genre[2].maingenre) && (
                    <p className='px-1 overflow-x-scroll'>
                      {renderValue(track.info.genre[2].maingenre)}
                    </p>
                  )}
                  {renderValue(track.info.genre[2].subgenre) && (
                    <p className='px-1 overflow-x-scroll'>
                      {renderValue(track.info.genre[2].subgenre)}
                    </p>
                  )}
                  {renderValue(track.info.relatedartist[1]) && (
                    <p className='px-1 overflow-x-scroll'>
                      {renderValue(track.info.relatedartist[1])}
                    </p>
                  )}
                  {renderValue(track.info.relatedartist[2]) && (
                    <p className='px-1 overflow-x-scroll'>
                      {renderValue(track.info.relatedartist[2])}
                    </p>
                  )}
                  {renderValue(track.info.relatedartist[3]) && (
                    <p className='px-1 overflow-x-scroll'>
                      {renderValue(track.info.relatedartist[3])}
                    </p>
                  )}
                </div>
                <div className='flex flex-row ml-auto text-neutral-400 hover:text-white text-center text-2xs md:text-xs w-auto'>
                  {renderValue(track.info.mood.mood1) && (
                    <p className='px-1'>{renderValue(track.info.mood.mood1)}</p>
                  )}
                  {renderValue(track.info.mood.mood2) && (
                    <p className='px-1'>{renderValue(track.info.mood.mood2)}</p>
                  )}
                  {renderValue(track.info.mood.mood3) && (
                    <p className='px-1'>{renderValue(track.info.mood.mood3)}</p>
                  )}
                  {renderValue(track.info.mood.energy) && (
                    <p className='px-1'>
                      {renderValue(track.info.mood.energy)}
                    </p>
                  )}
                  {renderValue(track.info.mood.color) && (
                    <p className='px-1'>{renderValue(track.info.mood.color)}</p>
                  )}
                  {renderValue(track.info.mood.character) && (
                    <p className='px-1'>
                      {renderValue(track.info.mood.character)}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className='flex items-center p-1.5 w-70px'>
              <div className='flex justify-center mr-0 md:mr-4'>
                <Icon.Plus width={18} height={18} fill='white' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCatalog;

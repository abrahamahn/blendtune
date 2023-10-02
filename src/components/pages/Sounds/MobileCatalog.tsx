"use client";
import React from 'react';
import Image from 'next/image';
import * as Icon from '@/components/common/icons';
import { Track } from '@/types/track';

export interface MobileCatalogProps {
  tracks: Track[],
  playTrack: (track: Track) => void,
  isPlaying: boolean,
}

const MobileCatalog: React.FC<MobileCatalogProps> = ({
  tracks,
  playTrack,
  isPlaying,
}) => {
  function renderValue(value: string) {
    return value && value !== 'n/a' && value !== '' ? value : null;
  };

  if (!tracks) {
    return null;
  }

  return (
    <div className='flex flex-col justify-center items-center w-5/6 h-full mx-auto m-0 p-0 bg-var(--background-color) overflow-hidden relative'>
      <div className='flex flex-col w-full h-full-screen m-0 p-0 px-10 relative'>
        {tracks.map((track: Track) => (
          <div
            key={track.id}
            className='z-10 flex font-sans flex-row justify-start px-2 overflow-hidden border-b border-gray-800 group hover:bg-gray-900'
            onClick = {() => playTrack(track)}
          >
            <div className='z-10 relative w-67 h-16 object-cover p-1 transition-transform duration-300 ease-in-out rounded-md group-hover:scale-105'>
              <Image
                src={`/images/artwork/${track.metadata.catalog}.jpg`}
                alt={track.metadata.title}
                className='z-20 rounded-md object-center object-cover max-w-full max-h-full h-auto mx-auto w-full p-1 transition-transform duration-200 ease-in-out shadow-md'
                width='100'
                height='100'
              />
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>
                {isPlaying ? (
                  <Icon.Pause width={20} height={20} fill='white' />
                ) : (
                  <Icon.Play width={20} height={20} fill='white' />
                )}
              </div>
            </div>
            <div className='relative flex flex-col justify-between w-full ml-3 overflow-hidden'>
              <div className='flex flex-row justify-between items-left mt-1 border-b border-gray-800'>
                <div className='absolute w-65 items-left ml-0 overflow-x-auto'>
                  <h3 className='text-[var(--text-color)] items-center text-[0.9rem] font-normal mt-[-3px] ml-0'>
                    {renderValue(track.metadata.title)}
                  </h3>
                </div>
                <div className='relative flex flex-row whitespace-nowrap p-0 m-0 ml-auto items-end pb-0'>
                  {renderValue(track.info.genre[1].maingenre) && (
                    <p className='inline-block flex-row justify-end bg-blue-900 text-white text-xs font-normal w-30px px-2 py-1 mx-auto rounded-md overflow-hidden mr-1 mb-1'>
                      {renderValue(track.info.genre[1].maingenre)}
                    </p>
                  )}
                  {renderValue(track.info.key.note) &&
                    renderValue(track.info.key.scale.substring(0, 3)) && (
                      <p className='inline-block flex-row justify-end bg-gray-900 text-white text-xs font-normal w-30px px-2 py-1 mx-auto rounded-md overflow-hidden mr-1 mb-1'>
                        {renderValue(track.info.key.note)}
                        {renderValue(track.info.key.scale.substring(0, 3))}
                      </p>
                    )}
                  {renderValue(track.info.bpm) && (
                    <p className='inline-block flex-row justify-end bg-gray-900 text-white text-xs font-normal w-30px px-2 py-1 mx-auto rounded-md overflow-hidden mr-1 mb-1'>
                      {renderValue(track.info.bpm)}
                    </p>
                  )}
                </div>
              </div>
              <div className='flex flex-row justify-between items-left py-1 px-0 mt-[-5px] ml-[-12px] overflow-x-auto'>
                <div className='flex flex-row whitespace-nowrap p-0 ml-2 m-0'>
                  {renderValue(track.info.genre[1].subgenre) && (
                    <p className='flex flex-row overflow-hidden truncate text-center text-xs font-normal w-auto m-0 ml-1 px-1 py-1 rounded-3px text-gray-400 group hover:bg-gray-600 hover:text-white rounded-md'>
                      {renderValue(track.info.genre[1].subgenre)}
                    </p>
                  )}
                  {renderValue(track.info.genre[2].maingenre) && (
                    <p className='flex flex-row overflow-hidden truncate text-center text-xs font-normal w-auto m-0 px-1 py-1 rounded-3px text-gray-400 group hover:bg-gray-600 hover:text-white rounded-md'>
                      {renderValue(track.info.genre[2].maingenre)}
                    </p>
                  )}
                  {renderValue(track.info.genre[2].subgenre) && (
                    <p className='flex flex-row overflow-hidden truncate text-center text-xs font-normal w-auto m-0 px-1 py-1 rounded-3px text-gray-400 group hover:bg-gray-600 hover:text-white rounded-md'>
                      {renderValue(track.info.genre[2].subgenre)}
                    </p>
                  )}
                  {renderValue(track.info.relatedartist[1]) && (
                    <p className='flex flex-row overflow-hidden truncate text-center text-xs font-normal w-auto m-0 px-1 py-1 rounded-3px text-gray-400 group hover:bg-gray-600 hover:text-white rounded-md'>
                      {renderValue(track.info.relatedartist[1])}
                    </p>
                  )}
                  {renderValue(track.info.relatedartist[2]) && (
                    <p className='flex flex-row overflow-hidden truncate text-center text-xs font-normal w-auto m-0 px-1 py-1 rounded-3px text-gray-400 group hover-bg-gray-600 hover:text-white rounded-md'>
                      {renderValue(track.info.relatedartist[2])}
                    </p>
                  )}
                  {renderValue(track.info.relatedartist[3]) && (
                    <p className='flex flex-row overflow-hidden truncate text-center text-xs font-normal w-auto m-0 px-1 py-1 rounded-3px text-gray-400 group hover-bg-gray-600 hover:text-white rounded-md'>
                      {renderValue(track.info.relatedartist[3])}
                    </p>
                  )}
                </div>
                <div className='flex flex-row whitespace-nowrap p-0 m-0'>
                  {renderValue(track.info.mood.mood1) && (
                    <p className='flex flex-row overflow-hidden truncate text-center text-xs font-normal w-auto m-0 px-1 py-1 rounded-3px text-gray-400 group hover-bg-gray-600 hover:text-white rounded-md'>
                      {renderValue(track.info.mood.mood1)}
                    </p>
                  )}
                  {renderValue(track.info.mood.mood2) && (
                    <p className='flex flex-row overflow-hidden truncate text-center text-xs font-normal w-auto m-0 px-1 py-1 rounded-3px text-gray-400 group hover-bg-gray-600 hover:text-white rounded-md'>
                      {renderValue(track.info.mood.mood2)}
                    </p>
                  )}
                  {renderValue(track.info.mood.mood3) && (
                    <p className='flex flex-row overflow-hidden truncate text-center text-xs font-normal w-auto m-0 px-1 py-1 rounded-3px text-gray-400 group hover-bg-gray-600 hover:text-white rounded-md'>
                      {renderValue(track.info.mood.mood3)}
                    </p>
                  )}
                  {renderValue(track.info.mood.energy) && (
                    <p className='flex flex-row overflow-hidden truncate text-center text-xs font-normal w-auto m-0 px-1 py-1 rounded-3px text-gray-400 group hover-bg-gray-600 hover:text-white rounded-md'>
                      {renderValue(track.info.mood.energy)}
                    </p>
                  )}
                  {renderValue(track.info.mood.color) && (
                    <p className='flex flex-row overflow-hidden truncate text-center text-xs font-normal w-auto m-0 px-1 py-1 rounded-3px text-gray-400 group hover-bg-gray-600 hover:text-white rounded-md'>
                      {renderValue(track.info.mood.color)}
                    </p>
                  )}
                  {renderValue(track.info.mood.character) && (
                    <p className='flex flex-row overflow-hidden truncate text-center text-xs font-normal w-auto m-0 px-1 py-1 rounded-3px text-gray-400 group hover-bg-gray-600 hover:text-white rounded-md'>
                      {renderValue(track.info.mood.character)}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className='flex flex-row justify-end items-center p-2 w-70px ml-0.5'>
              <div className='flex justify-center items-center relative w-18 h-18 max-w-full max-h-full border-none rounded-full mr-4 ml-0 text-light-color'>
                <Icon.Plus width={18} height={18} fill='var(--light-color)' />
              </div>
              <div className='flex justify-center items-center relative w-18 h-18 max-w-full max-h-full border-none'>
                <Icon.MoreInfo
                  width={15}
                  height={15}
                  fill='var(--light-color)'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCatalog;

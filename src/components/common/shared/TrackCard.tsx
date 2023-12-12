'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Track } from '@/types/track';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faArrowLeft,
  faArrowRight,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons';

interface TrackCardProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  togglePlayPause: (track: Track) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const TrackCard: React.FC<TrackCardProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  setIsPlaying,
  togglePlayPause,
  audioRef,
}) => {
  // Pagination Functions
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const totalPages = Math.ceil(tracks?.length / itemsPerPage);

  const handleNext = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const handlePrevious = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  }, []);

  const renderValue = (value: string) => {
    return value && value !== 'n/a' && value !== '' ? value : null;
  };

  const displayedTracks = useMemo(() => {
    return tracks?.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }, [tracks, currentPage, itemsPerPage]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth > 1280) {
        setItemsPerPage(6);
      } else if (window.innerWidth > 1024) {
        setItemsPerPage(5);
      } else if (window.innerWidth > 768) {
        setItemsPerPage(4);
      } else if (window.innerWidth > 640) {
        setItemsPerPage(15);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, handlePrevious, handleNext]);

  return (
    <div className='w-full flex justify-center items-center '>
      <audio
        key={currentTrack?.id}
        className='hidden'
        src={`/audio/tracks/${currentTrack?.file}`}
        controls
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false);
        }}
      />
      <div className='w-full xl:w-4/5 flex flex-col items-center justify-between'>
        <div className='container mx-auto'>
          {/* Header and Navigation */}
          <div className='w-full flex items-center justify-between mb-4 px-4'>
            <h1 className='font-custom text-white text-2xl md:text-3xl'>
              What&apos;s New
            </h1>
            <Link
              className='text-sm text-white px-3 py-1.5 rounded-full font-semibold bg-neutral-800 hover:bg-neutral-900 md:hidden'
              href='/sounds'
            >
              See all
            </Link>
            <div className='hidden md:block space-x-4'>
              <button
                onClick={handlePrevious}
                className={`w-8 h-8 rounded-full ${
                  currentPage === 0
                    ? 'bg-neutral-900'
                    : 'bg-neutral-800 hover:bg-neutral-900'
                }`}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size='xs'
                  className='text-white'
                />
              </button>
              <button
                onClick={handleNext}
                className={`w-8 h-8 rounded-full ${
                  currentPage === totalPages - 1
                    ? 'bg-neutral-900'
                    : 'bg-neutral-800 hover:bg-neutral-900'
                }`}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size='xs'
                  className='text-white'
                />
              </button>
            </div>
          </div>

          {/* Album Cover Cards */}
          <div className='w-full flex items-center justify-center mb-2 px-4 overflow-x-auto scrollbar-hide'>
            <div className='flex space-x-0 sm:space-x-4 xl:space-x-6 px-0 overflow-x-scroll scrollbar-hide w-full'>
              {displayedTracks?.map((track, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className='flex-grow w-60 md:bg-neutral-900 rounded-lg md:hover:bg-neutral-800 relative snap-start'
                >
                  <div className='w-48 md:w-auto flex items-center justify-center relative m-0 mr-3 md:m-3 aspect-ratio-1/1 user-select-none'>
                    <Image
                      src={`/images/artwork/${track.metadata.catalog}.jpg`}
                      alt={track.metadata.title}
                      width={200}
                      height={200}
                      className='rounded-md user-select-none'
                    />
                    <button
                      className={`absolute w-10 h-10 bottom-2 right-2 bg-indigo-700 rounded-full p-2 z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out hover:bg-indigo-500 ${
                        hoverIndex === index ? 'opacity-100' : 'opacity-0'
                      }`}
                      onClick={() => {
                        togglePlayPause(track);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          isPlaying && currentTrack === track ? faStop : faPlay
                        }
                        size='lg'
                        color='white'
                        className={
                          isPlaying && currentTrack === track ? 'ml-0' : 'ml-1'
                        }
                      />
                    </button>
                  </div>
                  <p className='text-white text-base mt-3 hover:underline hover:cursor-pointer mx-0 md:mx-4'>
                    {track.metadata.title}
                  </p>
                  <p className='text-neutral-400 text-sm hover:underline hover:cursor-pointer overflow-x-auto w-28 mt-1 md:mx-4 mb-4'>
                    {renderValue(track.info.relatedartist[1])}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;

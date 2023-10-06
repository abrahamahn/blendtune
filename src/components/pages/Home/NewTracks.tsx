'use client';
import React, { useState, useEffect } from 'react';
import { Track } from '@/types/track';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faArrowLeft,
  faArrowRight,
  faPlay,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

export interface NewTracksProps {
  tracks: Track[];
  currentTrack?: Track;
  playTrack: (track: Track) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const NewTracks: React.FC<NewTracksProps> = ({
  tracks,
  playTrack,
  currentTrack,
  isPlaying,
  setIsPlaying,
  audioRef,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth > 1500) {
        setItemsPerPage(6);
      } else if (window.innerWidth > 1000) {
        setItemsPerPage(5);
      } else if (window.innerWidth > 767) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(tracks.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const renderValue = (value: string) => {
    return value && value !== 'n/a' && value !== '' ? value : null;
  };

  const displayedTracks = tracks.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPlaying(false);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setIsPlaying, audioRef]);

  return (
    <div className='w-full flex flex-col h-auto px-6'>
      {/* Header */}
      <div className='w-full mx-auto flex flex-col items-center justify-between mb-4'>
        <div className='w-4/5 mx-auto flex items-center justify-between mb-4'>
          <h1 className='font-custom text-white text-3xl'>What&apos;s New</h1>
          <div className='flex space-x-4'>
            {/* Left Arrow Button */}
            <button
              onClick={handlePrevious}
              className='w-8 h-8 rounded-full bg-neutral-800'
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ color: '#ffffff' }}
              />
            </button>
            <button
              onClick={handleNext}
              className='w-8 h-8 rounded-full bg-neutral-800'
            >
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ color: '#ffffff' }}
              />
            </button>
          </div>
        </div>
        <div className='w-4/5 mx-auto flex items-center justify-between mb-4'>
          {/* Card Container */}
          <div className='flex space-x-4'>
            {displayedTracks.map((track, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className='bg-neutral-900 rounded-lg p-3 pb-4 hover:bg-neutral-800'
              >
                <div className='relative'>
                  <Image
                    src={`/images/artwork/${track.metadata.catalog}.jpg`}
                    alt={track.metadata.title}
                    width='200'
                    height='200'
                  />
                  <audio
                    className='flex justify-center items-center w-full h-5 bg-opacity-0 rounded-md opacity-0'
                    src={`/audio/tracks/${currentTrack?.file}`}
                    controls
                    ref={audioRef}
                    onEnded={() => setIsPlaying(false)}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                  />
                  {/* Updated button to toggle between play and pause based on the isPlaying state and currentTrack */}
                  {hoverIndex === index && (
                    <button
                      className='absolute w-10 h-10 bottom-7 right-2 bg-indigo-700 rounded-full p-2 z-50'
                      onClick={() => {
                        if (isPlaying && currentTrack === track) {
                          setIsPlaying(false);
                        } else {
                          playTrack(track);
                          setIsPlaying(true);
                          console.log(setIsPlaying);
                        }
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          isPlaying && currentTrack === track ? faPause : faPlay
                        }
                        size='lg'
                        color='white'
                        className='ml-0.5'
                      />
                    </button>
                  )}
                </div>
                {/* Title */}
                <p className='text-white text-md mt-2 ml-1 hover:underline hover:pointer'>
                  {track.metadata.title}
                </p>
                {/* Artist Type */}
                <p className='text-neutral-400 text-sm ml-1 hover:underline hover:pointer'>
                  {renderValue(track.info.relatedartist[1])},{' '}
                  {renderValue(track.info.relatedartist[2])}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTracks;

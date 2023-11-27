'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Track } from '@/types/track';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faArrowLeft,
  faArrowRight,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons';

const TrackCard: React.FC = () => {
  // State for Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // State for Audio
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // State for Fetching Data
  const [tracks, setTracks] = useState<Track[]>([]);

  // Pagination Functions
  const totalPages = Math.ceil(tracks.length / itemsPerPage);

  const handleNext = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const handlePrevious = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  }, []);

  // Audio Functions
  const playTrack = (track: Track) => {
    if (track !== currentTrack) {
      setIsAudioReady(false);
      setCurrentTrack(track);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Fetch Data Effect
  useEffect(() => {
    fetch('/data/tracks.json')
      .then(response => response.json())
      .then((data: Track[]) => {
        const reversedTracks = [...data].reverse();
        setTracks(reversedTracks);
      })
      .catch(error => console.error(error));
  }, []);

  // Audio Effects
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentTrack) {
      audio.src = `/audio/tracks/${currentTrack.file}`;
      setIsPlaying(true);
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying && isAudioReady) {
      audio.play().catch(error => console.error('Play error:', error));
    }
  }, [isPlaying, isAudioReady]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsAudioReady(true);
      if (isPlaying) {
        audio.play().catch(error => console.error('Play error:', error));
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (isPlaying) {
        audio.play();
        audio.volume = Math.max(0, Math.min(1, 1));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Window Resize Effect
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

  // Keyboard Event Effect
  useEffect(() => {
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
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, handlePrevious, handleNext]);

  // Helper Function to Render Values
  const renderValue = (value: string) => {
    return value && value !== 'n/a' && value !== '' ? value : null;
  };

  // Tracks to Display
  const displayedTracks = useMemo(() => {
    return tracks.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }, [tracks, currentPage, itemsPerPage]);

  return (
    <div className='w-full mx-auto flex flex-col mt-20 md:mt-20 sm:mt-0 md:h-auto px-0'>
      <audio
        key={currentTrack?.id}
        className='h-5 bg-opacity-0 rounded-md opacity-0'
        src={`/audio/tracks/${currentTrack?.file}`}
        controls
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false);
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        onPlay={() => {
          setIsPlaying(true);
        }}
      />
      <div className='md:w-full mx-auto flex flex-col items-center justify-between mb-4'>
        <div className='container mx-auto px-4'>
          {/* Header and Navigation */}
          <div className='w-full flex items-center justify-between mb-4'>
            <h1 className='font-custom text-white text-2xl md:text-3xl'>
              What&apos;s New
            </h1>
            <div className='flex space-x-4'>
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
                  style={{ color: '#ffffff' }}
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
                  style={{ color: '#ffffff' }}
                />
              </button>
            </div>
          </div>

          {/* Album Cover Cards */}
          <div className='xl:w-full lg:w-full md:full flex items-center justify-between mb-4 overflow-x-hidden'>
            <div className='flex space-x-4 overflow-x-auto'>
              {displayedTracks.map((track, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className='md:bg-neutral-900 rounded-lg p-3 pb-4 hover:bg-neutral-800 relative'
                >
                  <div className='relative'>
                    <Image
                      src={`/images/artwork/${track.metadata.catalog}.jpg`}
                      alt={track.metadata.title}
                      width={200}
                      height={200}
                      className='rounded-sm hidden md:block'
                    />
                    <Image
                      src={`/images/artwork/${track.metadata.catalog}.jpg`}
                      alt={track.metadata.title}
                      width={125}
                      height={125}
                      className='rounded-sm block md:hidden'
                    />
                    <button
                      className={`absolute w-10 h-10 bottom-2 right-2 bg-indigo-700 rounded-full p-2 z-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out hover:bg-indigo-500 ${
                        hoverIndex === index ? 'opacity-100' : 'opacity-0'
                      }`}
                      onClick={() => {
                        if (isPlaying && currentTrack === track) {
                          setIsPlaying(false);
                        } else {
                          playTrack(track);
                          setIsPlaying(true);
                        }
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
                  <p className='text-white text-md mt-3 hover:underline hover:pointer'>
                    {track.metadata.title}
                  </p>
                  <p className='text-neutral-400 text-sm hover:underline hover:pointer'>
                    {renderValue(track.info.relatedartist[1])},{' '}
                    {renderValue(track.info.relatedartist[2])}
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

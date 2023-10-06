'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Track } from '@/types/track';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faArrowLeft,
  faArrowRight,
  faPlay,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

const NewTracks: React.FC = () => {
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
    <div className='w-full flex flex-col h-auto px-6'>
      <audio
        key={currentTrack?.file}
        className='flex justify-center items-center w-full h-5 bg-opacity-0 rounded-md opacity-0'
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
      <div className='w-full mx-auto flex flex-col items-center justify-between mb-4'>
        <div className='w-4/5 mx-auto flex items-center justify-between mb-4'>
          <h1 className='font-custom text-white text-3xl'>What&apos;s New</h1>
          <div className='flex space-x-4'>
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
                  {hoverIndex === index && (
                    <button
                      className={`absolute w-10 h-10 bottom-2 right-2 bg-indigo-700 rounded-full p-2 z-50 transition-opacity duration-500 ease-in-out ${
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
                          isPlaying && currentTrack === track ? faPause : faPlay
                        }
                        size='lg'
                        color='white'
                        className='ml-0.5'
                      />
                    </button>
                  )}
                </div>
                <p className='text-white text-md mt-2 ml-1 hover:underline hover:pointer'>
                  {track.metadata.title}
                </p>
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

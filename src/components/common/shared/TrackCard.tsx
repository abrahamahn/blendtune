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
  // State for Fetching Data
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState<number>(0);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch('/data/tracks.json')
      .then(response => response.json())
      .then((data: Track[]) => {
        const reversedTracks = [...data].reverse();
        setTracks(reversedTracks);
      })
      .catch(error => console.error(error));
  }, []);

  const togglePlayPause = (track: Track) => {
    if (track !== currentTrack) {
      setCurrentTrack(track);
      setIsPlaying(true);
      setPlaybackPosition(0);
    } else if (isPlaying) {
      setIsPlaying(false);
      setPlaybackPosition(audioRef.current?.currentTime || 0);
      audioRef.current?.pause();
    } else {
      setIsPlaying(true);
      if (audioRef.current) {
        // Check if audioRef.current is not null
        audioRef.current.currentTime = playbackPosition;
        audioRef.current
          .play()
          .catch(error => console.error('Play error:', error));
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const audioSrc = `/audio/tracks/${currentTrack?.file}`;

      if (currentTrack && audio.src !== audioSrc) {
        audio.src = audioSrc;
        audio.load();
      }

      if (isPlaying) {
        audio.currentTime = playbackPosition;
        audio.play().catch(error => console.error('Play error:', error));
      } else {
        audio.pause();
      }
    }

    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, [currentTrack, isPlaying, playbackPosition]);

  // Pagination Functions
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const totalPages = Math.ceil(tracks.length / itemsPerPage);

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
    return tracks.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }, [tracks, currentPage, itemsPerPage]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth > 1500) {
        setItemsPerPage(6);
      } else if (window.innerWidth > 1000) {
        setItemsPerPage(5);
      } else if (window.innerWidth > 480) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(3);
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
    <div className='w-full flex justify-center items-center'>
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
      <div className='w-full xl:w-4/5 flex flex-col items-center justify-between py-4'>
        <div className='container mx-auto'>
          {/* Header and Navigation */}
          <div className='w-full flex items-center justify-between mb-4 px-3 md:px-0'>
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
          <div className='w-full flex items-center justify-center mb-2 px-2'>
            <div className='flex space-x-0 sm:space-x-4 px-0 overflow-x-scroll'>
              {displayedTracks.map((track, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className='flex-grow md:bg-neutral-900 rounded-lg p-3.5 pb-4 hover:bg-neutral-800 relative'
                >
                  <div className='relative aspect-ratio-1/1'>
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
                  <p className='text-white text-base mt-3 hover:underline hover:cursor-pointer'>
                    {track.metadata.title}
                  </p>
                  <p className='text-neutral-400 text-sm hover:underline hover:cursor-pointer overflow-x-auto w-28'>
                    {renderValue(track.info.relatedartist[1])}
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

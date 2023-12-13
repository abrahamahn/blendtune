'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Track } from '@/types/track';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBackwardStep,
  faForwardStep,
  faRepeat,
  faVolumeLow,
  faPlay,
  faStop,
  faEllipsisVertical,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

type CustomAudioRef = React.RefObject<HTMLAudioElement> & {
  volume: number;
};

export interface MusicPlayerProps {
  currentTrack?: Track;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  audioRef: CustomAudioRef; // Updated type
  playPreviousTrack: () => void;
  playNextTrack: () => void;
}

function formatTime(timeInSeconds: number | undefined) {
  if (typeof timeInSeconds !== 'number' || isNaN(timeInSeconds)) {
    return '0:00';
  }

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrack,
  isPlaying,
  setIsPlaying,
  audioRef,
  playPreviousTrack,
  playNextTrack,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [volume, setVolume] = useState(1);
  const [trackDuration, setTrackDuration] = useState(0);
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const [initialVolumePosition, setInitialVolumePosition] = useState(0);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const toggleVolumeVisibility = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  const handleVolumeChange = (e: React.MouseEvent) => {
    if (audioRef.current) {
      const volumeBar = e.currentTarget;
      const rect = volumeBar.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      let newVolume = 1 - mouseY / rect.height; // Invert the volume

      // Ensure that the newVolume is within the valid range [0, 1]
      newVolume = Math.max(0, Math.min(1, newVolume));

      // Set the audio's volume using the newVolume
      audioRef.current.volume = newVolume;

      // Update the state to reflect the new volume level
      setVolume(newVolume);

      // Update the initialVolumePosition for future interactions
      setInitialVolumePosition(mouseY);
      console.log(initialVolumePosition);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      // Set the initial playback volume to 95%
      audioRef.current.volume = 1;

      const currentAudioRef = audioRef.current;
      currentAudioRef.addEventListener('loadedmetadata', () => {
        setTrackDuration(currentAudioRef.duration);
        // Enable loop mode if repeat is enabled
        currentAudioRef.loop = isRepeatEnabled;
      });
    }

    // Cleanup event listeners when the component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', () => {});
      }
    };
  }, [audioRef, isRepeatEnabled]);

  const playPauseButton = isPlaying ? (
    <FontAwesomeIcon icon={faStop} className='text-white dark:text-black' />
  ) : (
    <FontAwesomeIcon
      icon={faPlay}
      className='ml-0.5 text-white dark:text-black'
    />
  );

  const playPauseButtonMobile = isPlaying ? (
    <FontAwesomeIcon icon={faStop} className='text-white' />
  ) : (
    <FontAwesomeIcon icon={faPlay} className='ml-0.5 text-white' />
  );

  return (
    <div>
      {/* Desktop Player */}
      <div className='fixed bottom-0 left-0 w-full z-50 hidden lg:block'>
        <div className='flex flex-row items-center justify-center w-full h-20 border-t dark:border-neutral-800 bg-white dark:bg-transparent border-neutral-300 backdrop-blur-md px-6'>
          {/* Song Navigation Button */}
          <div className='flex flex-row w-48 h-full items-center justify-center '>
            <div className='items-center mr-4 p-2'>
              <FontAwesomeIcon
                icon={faBackwardStep}
                size='xl'
                onClick={playPreviousTrack}
                className='cursor-pointer hover:opacity-75 text-black dark:text-white'
              />
            </div>
            {/* Play Button */}
            <div
              className='flex bg-black dark:bg-white rounded-full w-10 h-10 items-center justify-center user-select-none '
              onClick={togglePlayPause}
            >
              <div className='cursor-pointer hover:opacity-75 text-white dark:text-black'>
                {playPauseButton}
              </div>
            </div>
            <div className='items-center p-2 ml-4'>
              <FontAwesomeIcon
                icon={faForwardStep}
                size='xl'
                onClick={playNextTrack}
                className='cursor-pointer hover:opacity-75 text-black dark:text-white'
              />
            </div>
            <div className='items-center p-2 ml-2 text-neutral-400 dark:text-white cursor-pointer'>
              <FontAwesomeIcon
                icon={faRepeat}
                onClick={() => setIsRepeatEnabled(!isRepeatEnabled)}
                className='cursor-pointer hover:opacity-75 text-black dark:text-white'
              />
            </div>
          </div>
          {/* Song Playback */}
          <div className='flex flex-row w-1/2 h-full items-center px-4'>
            {/* Navigation Bar */}
            <div className='flex w-full h-full items-center justify-center'>
              <audio
                className='hidden'
                src={`/audio/tracks/${currentTrack?.file}`}
                ref={audioRef}
                autoPlay={isPlaying}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onTimeUpdate={handleTimeUpdate}
                preload='auto'
              />
              <div
                className='w-full border-md bg-black/10 dark:bg-white/10 h-1 rounded-full shadow-xl overflow-hidden cursor-pointer'
                onClick={e => {
                  // Calculate the click position relative to the duration bar's width
                  const durationBar = e.currentTarget;
                  const rect = durationBar.getBoundingClientRect();
                  const mouseX = e.clientX - rect.left;
                  const newPercentage = (mouseX / rect.width) * 100;

                  // Calculate the new playback position based on the click position and total duration
                  const newPlaybackPosition =
                    (newPercentage / 100) * trackDuration;

                  // Set the audio's current time to the new playback position
                  if (audioRef.current) {
                    audioRef.current.currentTime = newPlaybackPosition;
                  }
                }}
              >
                <div
                  className='bg-black dark:bg-white h-1 rounded-md shadow-md w-full transition-width duration-100 ease-in-out cursor-pointer'
                  style={{
                    width: `${
                      (currentTime / (audioRef?.current?.duration ?? 1)) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
            {/* Timestamp */}
            <div className='text-xs ml-2 w-28 h-full flex items-center justify-center user-select-none'>
              {' '}
              {/* Apply user-select-none here */}
              <p className='text-black dark:text-white'>
                {formatTime(currentTime)}
                <span className='text-transparent'> / </span>
                {/* Separate trackDuration */}
                <span className='text-neutral-500'>
                  {formatTime(trackDuration)}
                </span>{' '}
                {/* Set different colors */}
              </p>
            </div>
            {/* Volume Icon */}
            <div
              className='relative'
              onClick={toggleVolumeVisibility} // Toggle volume visibility on click
            >
              <div className='cursor-pointer'>
                <FontAwesomeIcon
                  icon={faVolumeLow}
                  style={{ color: isVolumeVisible ? '#ababab' : '#888888' }}
                  size='lg'
                  className='cursor-pointer hover:opacity-75'
                />
              </div>
              {isVolumeVisible && (
                // Volume Bar
                <div
                  onMouseDown={e => {
                    setIsDraggingVolume(true);
                    setInitialVolumePosition(e.clientY);
                    handleVolumeChange(e); // Call it when you click on the volume bar
                  }}
                  onMouseMove={e => {
                    if (isDraggingVolume) {
                      handleVolumeChange(e); // Call it when you drag the volume bar
                    }
                  }}
                  onMouseUp={() => {
                    setIsDraggingVolume(false);
                  }}
                  onClick={handleVolumeChange} // Call it when you click anywhere on the volume bar
                  className='bg-neutral-200 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 h-28 w-6 rounded-full absolute bottom-10 right-[-3px] transform z-10 flex justify-center items-center'
                >
                  {/* Full Volume Bar */}
                  <div className='bg-indigo-500 rounded-lg h-20 w-1 relativ cursor-pointer'>
                    {/* Threshold (currently set to full, with h-20) */}
                    <div
                      className='bg-neutral-50 dark:bg-neutral-500 rounded-lg w-1'
                      style={{ height: `${(1 - volume) * 100}%` }}
                    ></div>
                    {/* Volume Bar */}
                    <div
                      className='rounded-full h-3 w-3 bg-indigo-500 absolute cursor-pointer'
                      style={{
                        bottom: `${volume * 70 + 10}%`,
                        left: '5px',
                        zIndex: '50',
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Song Information */}
          <div className='flex items-center h-full w-96'>
            <div className='flex items-center justify-center w-16 ml-2 rounded-md'>
              <Image
                src={`/images/artwork/${
                  currentTrack?.metadata?.catalog ?? 'default'
                }.jpg`}
                alt={currentTrack?.metadata?.title ?? ''}
                className='w-full h-auto object-cover rounded-md shadow-md cursor-pointer hover:opacity-75'
                width={64}
                height={64}
                priority
              />
            </div>
            <div className='flex flex-col justify-center items-left p-4 w-56 h-full'>
              <div className='flex flex-col justify-left items-left'>
                <p className='text-black dark:text-white text-sm font-semibold cursor-pointer hover:underline user-select-none'>
                  {' '}
                  {/* Apply user-select-none here */}
                  {currentTrack?.metadata.title}
                </p>
                <p className='text-neutral-600 dark:text-neutral-400 text-xs mb-1 cursor-pointer hover:underline user-select-none'>
                  {' '}
                  {/* Apply user-select-none here */}
                  {currentTrack?.metadata.producer}
                </p>
              </div>
              <div className='flex items-left flex-row justify-left m-0 p-0 mr-auto'>
                <p className='flex items-center text-2xs text-neutral-400 dark:text-white px-2 mr-1 border border-neutral-400 dark:border-neutral-500 rounded-md cursor-default'>
                  {currentTrack?.info.key.note}{' '}
                  {currentTrack?.info.key.scale.substring(0, 3)}
                </p>
                <p className='flex justify-center items-center text-2xs text-neutral-400 dark:text-black mr-1 bg-transparent dark:bg-neutral-500 rounded-md w-12 cursor-default border border-neutral-400 dark:border-transparent'>
                  {currentTrack?.info.bpm} BPM
                </p>
                <p className='flex justify-center items-center text-2xs bg-blue-800 text-white rounded-md w-16 cursor-default'>
                  {currentTrack?.info.genre[1].maingenre}
                </p>
              </div>
            </div>
            {/* Song Buttons */}
            <div className='flex flex-row justify-center items-center w-28 h-full '>
              <div className='flex items-center justify-center mx-auto bg-neutral-200 dark:bg-neutral-700 p-2 rounded-full relative cursor-pointer hover:opacity-75'>
                <FontAwesomeIcon
                  icon={faPlus}
                  className='text-black dark:text-white'
                />
              </div>
              <div className='ml-2 flex items-center justify-center mx-auto bg-neutral-200 dark:bg-neutral-700 p-2 rounded-full relative cursor-pointer hover:opacity-75'>
                <FontAwesomeIcon
                  icon={faHeart}
                  className='text-black dark:text-white'
                />
              </div>
              <div className='ml-2 flex items-center justify-center mx-auto bg-neutral-200 dark:bg-neutral-700 p-2 px-3.5 rounded-full relative cursor-pointer hover:opacity-75'>
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className='text-black dark:text-white'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Mobile Player */}
      <div className='fixed bottom-6 left-0 w-full px-4 z-30 block lg:hidden'>
        <div className='flex flex-col items-center p-1 w-full rounded-md bg-blue-800 overflow-hidden h-14 backdrop-blur-md'>
          <div className='flex items-center w-full h-full'>
            <div className='flex items-center justify-center w-14 h-14 ml-1 rounded-md'>
              <Image
                src={`/images/artwork/${
                  currentTrack?.metadata?.catalog ?? 'default'
                }.jpg`}
                alt={currentTrack?.metadata?.title ?? ''}
                className='w-full h-auto object-cover rounded-md shadow-md'
                width={35}
                height={35}
              />
            </div>
            <div className='ml-2 w-full h-full'>
              <div className='mt-1'>
                <p className='text-white text-sm'>
                  {currentTrack?.metadata.title}
                </p>
              </div>
              <div className='flex'>
                <p className='text-2xs border-neutral-800 text-white px-2 mr-1 bg-blue-500 rounded-md'>
                  {currentTrack?.info.key.note}
                  {currentTrack?.info.key.scale.substring(0, 3)}
                </p>
                <p className='text-2xs text-white mr-1 bg-blue-700 px-2 rounded-md'>
                  {currentTrack?.info.bpm}BPM
                </p>
                <p className='text-2xs text-white mr-1 bg-purple-700 px-2 rounded-md'>
                  {currentTrack?.info.genre[1].maingenre}
                </p>
              </div>
            </div>
            <div className='flex flex-row justify-center items-center h-full w-24'>
              <div className='mr-4 cursor-pointer hover:opacity-75'>
                <FontAwesomeIcon icon={faPlus} className='text-white' />
              </div>
              <div onClick={togglePlayPause}>{playPauseButtonMobile}</div>
            </div>
          </div>
          <div className='w-full' style={{ width: 'calc(100% + 11px)' }}>
            <div className='sticky bottom-4 w-full h-2'>
              <div
                className='bg-white h-0.5 rounded-md shadow-md w-full transition-width duration-100 ease-in-out'
                style={{
                  width: `${
                    (currentTime / (audioRef?.current?.duration ?? 1)) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

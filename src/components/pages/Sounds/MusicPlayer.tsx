'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import * as Icon from '@/components/common/icons';
import { Track } from '@/types/track';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBackwardStep,
  faForwardStep,
  faRepeat,
  faVolumeLow,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

export interface MusicPlayerProps {
  currentTrack?: Track;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

function formatTime(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrack,
  isPlaying,
  setIsPlaying,
  audioRef,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [volume, setVolume] = useState(1);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const toggleVolumeVisibility = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  const handleVolumeDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const volumeBar = event.currentTarget;
      const rect = volumeBar.getBoundingClientRect();
      const mouseY = event.clientY - rect.top; // Calculate mouse position relative to the volume bar
      const newVolume = 1 - mouseY / rect.height; // Adjust volume based on mouse position
      // Ensure volume is within the range [0, 1]
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      audioRef.current.volume = clampedVolume;
      setVolume(clampedVolume);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
    // Cleanup event listeners when the component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', () => {});
      }
    };
  }, [isPlaying, audioRef]);

  const playPauseButton = isPlaying ? (
    <Icon.Pause width={20} height={20} fill='black' />
  ) : (
    <Icon.Play width={20} height={20} fill='black' />
  );

  const playPauseButtonMobile = isPlaying ? (
    <Icon.Pause width={20} height={20} fill='white' />
  ) : (
    <Icon.Play width={18} height={18} fill='white' />
  );

  return (
    <div>
      {/* Desktop Player */}
      <div className='fixed bottom-0 left-0 w-full z-50 hidden md:block'>
        <div className='flex flex-row items-center justify-center w-full h-20 border-t border-neutral-800 backdrop-blur-md px-6'>
          {/* Song Navigation Button */}
          <div className='flex flex-row w-48 h-full items-center justify-center'>
            <div className='items-center mr-4 p-2'>
              <FontAwesomeIcon
                icon={faBackwardStep}
                style={{ color: '#ffffff' }}
                size='xl'
              />
            </div>
            {/* Play Button */}
            <div
              className='flex bg-white hover:bg-slate-300 rounded-full w-10 h-10 items-center justify-center'
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <p className='ml-0.5'>{playPauseButton}</p>
            </div>
            <div className='items-center p-2 ml-4'>
              <FontAwesomeIcon
                icon={faForwardStep}
                style={{ color: '#ffffff' }}
                size='xl'
              />
            </div>
            <div className='items-center p-2 ml-2'>
              <FontAwesomeIcon icon={faRepeat} style={{ color: '#adadad' }} />
            </div>
          </div>
          {/* Song Playback */}
          <div className='flex flex-row w-1/2 h-full items-center px-4'>
            {/* Navigation Bar */}
            <div className='flex w-full h-full items-center justify-center'>
              <audio
                className='hidden'
                src={`/audio/tracks/${currentTrack?.file}`}
                controls
                ref={audioRef}
                autoPlay={isPlaying}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onTimeUpdate={handleTimeUpdate}
              />
              <div className='w-full border-md bg-white/10 h-1 rounded-full shadow-xl overflow-hidden'>
                <div
                  className='bg-white h-1 rounded-md shadow-md w-full transition-width duration-100 ease-in-out'
                  style={{
                    width: `${
                      (currentTime / (audioRef?.current?.duration ?? 1)) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
            {/* Timestamp */}
            <div className='text-xs ml-2 w-28 h-full flex items-center justify-center'>
              <p className='text-white'>{formatTime(currentTime)}</p>
              <p>&nbsp;&nbsp;</p>
              <p className='text-neutral-400'>
                {formatTime(audioRef?.current?.duration ?? 0)}
              </p>
            </div>
            {/* Volume Icon */}
            <div
              className='relative'
              onClick={toggleVolumeVisibility} // Toggle volume visibility on click
            >
              <FontAwesomeIcon
                icon={faVolumeLow}
                style={{ color: isVolumeVisible ? '#ffffff' : '#adadad' }}
                size='lg'
              />
              {isVolumeVisible && (
                <div
                  className='bg-white rounded-lg h-16 w-4 absolute top-0 right-6 transform -translate-y-1/2 z-10'
                  onMouseMove={handleVolumeDrag}
                  onMouseDown={handleVolumeDrag}
                >
                  {/* Display volume level here */}
                  <div
                    className='bg-blue-500 h-full'
                    style={{ height: `${(1 - volume) * 100}%` }} // Reverse the visual displa
                  ></div>
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
                className='w-full h-auto object-cover rounded-md shadow-md'
                width={64}
                height={64}
              />
            </div>
            <div className='flex flex-col justify-center items-left p-4 w-56 h-full'>
              <div className='flex flex-row justify-left items-center'>
                <p className='text-white text-sm mb-1'>
                  {currentTrack?.metadata.title}
                </p>
              </div>
              <div className='flex items-left flex-row justify-left m-0 p-0 mr-auto'>
                <p className='flex items-center text-2xs text-white px-2 mr-1 border border-neutral-500 rounded-md'>
                  {currentTrack?.info.key.note}{' '}
                  {currentTrack?.info.key.scale.substring(0, 3)}
                </p>
                <p className='flex justify-center items-center text-2xs text-black mr-1 bg-neutral-500 rounded-md w-12'>
                  {currentTrack?.info.bpm} BPM
                </p>
                <p className='flex justify-center items-center text-2xs bg-blue-800 text-white rounded-md w-16'>
                  {currentTrack?.info.genre[1].maingenre}
                </p>
              </div>
            </div>
            {/* Song Buttons */}
            <div className='flex flex-row justify-center items-center w-20 h-full'>
              <div className='flex items-center justify-center mx-auto bg-neutral-700 p-3 rounded-full relative'>
                <FontAwesomeIcon icon={faHeart} style={{ color: '#ffffff' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Mobile Player */}
      <div className='fixed bottom-6 left-0 w-full px-4 z-50 block md:hidden'>
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
            <div className='flex flex-row justify-center items-center h-full w-20'>
              <div className='mr-2'>
                <Icon.Plus width={18} height={18} fill='white' />
              </div>
              <div onClick={() => setIsPlaying(!isPlaying)}>
                {playPauseButtonMobile}
              </div>
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

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
} from '@fortawesome/free-solid-svg-icons';

export interface MusicPlayerProps {
  currentTrack?: Track;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrack,
  isPlaying,
  setIsPlaying,
  audioRef,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      const updateTime = () => {
        setCurrentTime(audioRef?.current?.currentTime || 0);
      };
      const audioElement = audioRef.current;
      audioElement.addEventListener('timeupdate', updateTime);
      setDuration(audioElement.duration);
      return () => {
        audioElement.removeEventListener('timeupdate', updateTime);
      };
    }
  }, [audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioRef]);

  const playPauseButton = isPlaying ? (
    <Icon.Pause width={20} height={20} fill='black' />
  ) : (
    <Icon.Play width={20} height={20} fill='black' />
  );

  return (
    <div className='fixed bottom-0 left-0 w-full bg-opacity-0 mx-auto z-10'>
      <div className='flex flex-row items-center mx-auto w-full h-20 border-t border-neutral-900 bg-black/10 overflow-hidden backdrop-blur-md'>
        {/* Song Navigation Button */}
        <div className='flex flex-row w-48 h-full mx-auto bg-black items-center justify-center'>
          <div className='items-center mr-6'>
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
            {playPauseButton}
          </div>
          <div className='items-center ml-6'>
            <FontAwesomeIcon
              icon={faForwardStep}
              style={{ color: '#ffffff' }}
              size='xl'
            />
          </div>
          <div className='items-center ml-6'>
            <FontAwesomeIcon icon={faRepeat} style={{ color: '#adadad' }} />
          </div>
        </div>
        {/* Song Playback */}
        <div className='flex flex-row w-1/2 h-full mx-auto items-center'>
          {/* Navigation Bar */}
          <div
            className='flex w-full h-full items-center justify-center'
            style={{ width: 'calc(100% + 11px)' }}
          >
            <audio
              className='hidden'
              src={`/audio/tracks/${currentTrack?.file}`}
              controls
              ref={audioRef}
              autoPlay={isPlaying}
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
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
          <div>{duration}</div>
          {/* Volume Icon */}
          <div className='flex w-16 p-4 justify-center items-center mx-auto h-full'>
            <FontAwesomeIcon
              icon={faVolumeLow}
              style={{ color: '#ffffff' }}
              size='lg'
            />
          </div>
        </div>
        {/* Song Information */}
        <div className='flex w-96 h-full'>
          <div className='flex items-center mx-auto w-full h-full'>
            <div className='flex items-center justify-center w-12 h-full ml-2 rounded-md'>
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
            <div className='flex flex-col justify-center items-left whitespace-nowrap font-sans font-family-segoe-ui ml-2 w-full h-full p-0'>
              <div className='flex flex-row justify-left items-center m-0 p-0 mt-[-3px] mb-0'>
                <p className='m-0 text-white text-base font-md ml-1 mt-1'>
                  {currentTrack?.metadata.title}
                </p>
              </div>
              <div className='flex items-left flex-row justify-left m-0 p-0 mr-auto mt-0'>
                <p className='z-50 text-xs text-white pt-0.5 m-0 py-0 px-2 mb-1 mr-1 bg-blue-500 font-light rounded-md'>
                  {currentTrack?.info.key.note}
                  {currentTrack?.info.key.scale.substring(0, 3)}
                </p>
                <p className='z-50 text-xs text-white pt-0.5 m-0 py-0 px-2 mb-1 mr-1 bg-blue-700 font-light rounded-md'>
                  {currentTrack?.info.bpm}BPM
                </p>
              </div>
            </div>
            <div className='flex flex-row justify-center items-center w-20 h-full'>
              <div className='w-full h-8 mt-3'>
                <Icon.Plus
                  width={18}
                  height={18}
                  fill='white'
                  className='flex items-center justify-center w-8 h-8 rounded-full mx-auto absolute top-0 bottom-0 left-0 right-0 text-white'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

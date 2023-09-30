'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import * as Icon from '@/components/common/icons';
import { Track } from '@/types/track';

interface MiniPlayerProps {
  currentTrack: Track | null;
  playTrack: (track: Track) => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({
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
      audioRef.current.addEventListener('timeupdate', updateTime);
      setDuration(audioRef.current.duration);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updateTime);
        }
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
    <Icon.Pause
      width={20}
      height={20}
      className='flex items-center justify-center w-8 h-8 rounded-full mx-auto absolute top-0 bottom-0 left-0 right-0 text-white'
      fill='white'
    />
  ) : (
    <Icon.Play
      width={18}
      height={18}
      className='flex items-center justify-center w-8 h-8 rounded-full mx-auto absolute top-0 bottom-0 left-0 right-0 text-white'
      fill='white'
    />
  );

  return (
    <div className='fixed bottom-16 left-0 w-full bg-opacity-0 mx-auto z-10'>
      <div className='flex flex-col items-center mx-auto w-4/5 h-50px p-1 w-90 rounded-md bg-blue-800 overflow-hidden h-14 backdrop-blur-md'>
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
            <div
              className='w-full h-8 mt-3'
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {playPauseButton}
            </div>
          </div>
        </div>
        <div
          className='w-full mt-2.5px h-20'
          style={{ width: 'calc(100% + 11px)' }}
        >
          <audio
            className='flex justify-center items-center w-full h-5 bg-opacity-0 rounded-md opacity-0'
            src={`/audio/tracks/${currentTrack?.file}`}
            controls
            ref={audioRef}
            autoPlay={isPlaying}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />
          <div className='sticky top-0 left-0 right-0 bottom-4 w-full mt-0 border-md bg-white/10 h-2 rounded-full shadow-xl overflow-hidden'>
            <div
              className='bg-white h-0.5 mt-0 rounded-md shadow-md w-full transition-width duration-100 ease-in-out'
              style={{
                width: `${
                  (currentTime / (audioRef?.current?.duration ?? 1)) * 100
                }%`,
              }}
            />
            <div
              className='relative'
              style={{
                left: `calc(${
                  (currentTime / (audioRef?.current?.duration ?? 1)) * 100
                }%)`,
              }}
              onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                const handleMouseMove = (event: MouseEvent) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = event.clientX - rect.width;
                  const fraction = x / e.currentTarget.offsetWidth;
                  if (audioRef && audioRef.current) {
                    audioRef.current.currentTime = duration * fraction;
                  }
                  setCurrentTime(audioRef?.current?.currentTime ?? 0);
                };
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                });
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;

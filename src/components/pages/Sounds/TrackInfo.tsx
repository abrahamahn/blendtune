import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Track } from '@/types/track';
import Image from 'next/image';

interface ExtendedAudioElement extends HTMLAudioElement {
  sourceNode?: MediaElementAudioSourceNode;
  analyser?: AnalyserNode;
}

type CustomAudioRef = React.RefObject<ExtendedAudioElement> & {
  volume: number;
};

interface TrackInfoProps {
  currentTrack?: Track;
  audioRef: CustomAudioRef;
  closeTrackInfo: () => void;
}

const TrackInfo: React.FC<TrackInfoProps> = ({
  currentTrack,
  audioRef,
  closeTrackInfo,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number>();

  const formatTime = (timeInSeconds: number | undefined) => {
    if (typeof timeInSeconds !== 'number' || isNaN(timeInSeconds)) {
      return '0:00';
    }

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    if (audioRef.current && !audioRef.current.sourceNode) {
      // Create a single AudioContext and attach it to audioRef
      const audioCtx = new AudioContext();
      audioRef.current.sourceNode = audioCtx.createMediaElementSource(
        audioRef.current
      );
      audioRef.current.analyser = audioCtx.createAnalyser();
      audioRef.current.sourceNode.connect(audioRef.current.analyser);
      audioRef.current.analyser.connect(audioCtx.destination);
    }

    const setupEqualizer = () => {
      if (audioRef.current && audioRef.current.analyser && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const analyser = audioRef.current.analyser;

        const frameLooper = () => {
          animationFrameId.current = requestAnimationFrame(frameLooper);
          const fbc_array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(fbc_array);
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#ffffff';
            const bar_count = canvas.width / 4;
            for (let i = 0; i < bar_count; i++) {
              const bar_pos = i * 4;
              const bar_width = 2;
              const bar_height = -(fbc_array[i] / 2);
              ctx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
            }
          }
        };

        frameLooper();
      }
    };

    if (audioRef.current) {
      setTrackDuration(audioRef.current.duration);
      setupEqualizer();
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [audioRef, currentTrack]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [audioRef]);

  return (
    <div className='fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-neutral-900 shadow-lg z-40 border-l border-neutral-100 dark:border-neutral-900 pt-24 mt-2 lg:pt-12 lg:mt-4'>
      <div className='flex flex-row justify-between w-full h-14 bg-neutral-100 dark:bg-neutral-950 p-3'>
        <div className='flex justify-center items-center text-base text-blackdark:text-white'>
          [{currentTrack?.metadata?.catalog}] {currentTrack?.metadata?.title}
        </div>
        <div
          className='flex justify-center items-center w-8 h-8 p-4 border border-neutral-400 dark:border-neutral-600 rounded-md'
          onClick={closeTrackInfo}
        >
          <FontAwesomeIcon
            className='text-neutral-400 dark:text-neutral-600'
            size='sm'
            icon={faArrowRightFromBracket}
          />
        </div>
      </div>
      <div className='py-2 px-4'>
        <div className='flex flex-col bg-neutral-200 dark:bg-black p-2 rounded-md m-0 mt-4 md:mt-2'>
          <div className='mt-0'>
            <Image
              src={`/images/artwork/${
                currentTrack?.metadata?.catalog ?? 'default'
              }.jpg`}
              alt={currentTrack?.metadata?.title ?? ''}
              className='w-full h-auto object-cover rounded-md shadow-md cursor-pointer hover:opacity-75'
              width={500}
              height={500}
              priority
            />
          </div>
          <div className='mt-4 flex flex-row justify-between'>
            <div className='flex flex-col text-neutral-600 dark:text-white'>
              <div className='text-base'>
                [{currentTrack?.metadata?.catalog}]{' '}
                {currentTrack?.metadata?.title}
              </div>
              <div className='text-sm text-neutral-600 dark:text-neutral-400'>
                {currentTrack?.metadata?.producer}
              </div>
            </div>
            <button className='flex bg-indigo-400 dark:bg-indigo-700 text-sm text-white w-16 h-10 items-center justify-center rounded-lg'>
              {' '}
              Buy
            </button>
          </div>
          <div className='w-full h-16 mt-2 pt-1 bg-neutral-200 dark:bg-neutral-900 block rounded-md'>
            {' '}
            <canvas
              className='flex items-center justify-center w-full h-full'
              ref={canvasRef}
              width={1000}
              height={110}
            ></canvas>
          </div>
          {/* Navigation Bar */}
          <div className='flex w-full h-full items-center justify-center mt-5'>
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
                className='bg-black/40 dark:bg-white h-1 rounded-md shadow-md w-full transition-width duration-100 ease-in-out cursor-pointer'
                style={{
                  width: `${
                    (currentTime / (audioRef?.current?.duration ?? 1)) * 100
                  }%`,
                }}
              />
            </div>
          </div>
          {/* Timestamp */}
          <div className='text-xs mt-1 w-full h-full flex items-center justify-between user-select-none'>
            {' '}
            {/* Apply user-select-none here */}
            <p className='text-black/60 dark:text-white'>
              {formatTime(currentTime)}
            </p>
            <p className='text-neutral-500'>
              {formatTime(audioRef?.current?.duration)}
            </p>{' '}
          </div>
          <div className='w-full mt-4 border-b pb-1'>
            <p className='text-neutral-500 dark:text-white'>Track Details</p>
          </div>
          <div className='w-full justify-between mt-2 flex flex-row text-neutral-500  dark:text-white'>
            <p className='text-xs'>Genre</p>
            <p className='text-xs'>{currentTrack?.info?.genre[0].maingenre}</p>
          </div>
          <div className='w-full justify-between mt-2 flex flex-row text-neutral-500  dark:text-white'>
            <p className='text-xs'>BPM</p>
            <p className='text-xs'>{currentTrack?.info?.bpm}</p>
          </div>
          <div className='w-full justify-between mt-2 flex flex-row text-neutral-500  dark:text-white'>
            <p className='text-xs'>Key</p>
            <p className='text-xs'>
              {currentTrack?.info?.key.note} {currentTrack?.info?.key.scale}
            </p>
          </div>
          <div className='w-full justify-between mt-2 flex flex-row text-neutral-500  dark:text-white'>
            <p className='text-xs'>Mood</p>
            <p className='text-xs'>
              {currentTrack?.info?.mood[0]}, {currentTrack?.info?.mood[1]},{' '}
              {currentTrack?.info?.mood[2]}
            </p>
          </div>
          <div className='w-full justify-between mt-2 flex flex-row text-neutral-500  dark:text-white'>
            <p className='text-xs'>Related Artist</p>
            <p className='text-xs'>
              {currentTrack?.info?.relatedartist[0]},{' '}
              {currentTrack?.info?.relatedartist[1]},{' '}
              {currentTrack?.info?.relatedartist[2]}
            </p>
          </div>
        </div>
      </div>

      <div className='px-4'>
        <div className='flex flex-col bg-neutral-200 dark:bg-black p-2 rounded-md mt-2 h-20'>
          <p className='text-neutral-500 dark:text-white'>Sounds Similar</p>
        </div>
      </div>
    </div>
  );
};

export default TrackInfo;

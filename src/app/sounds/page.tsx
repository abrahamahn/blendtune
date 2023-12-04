'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MobileCatalog, MusicPlayer } from '@/components/pages/Sounds';
import { Track } from '@/types/track';

type CustomAudioRef = React.RefObject<HTMLAudioElement> & {
  volume: number;
};

const Sounds: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null | undefined>(
    null
  );
  const audioRef = useRef<HTMLAudioElement>(null) as CustomAudioRef;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(false);

  const playTrack = (track: Track) => {
    if (currentTrack === track && isPlaying === true) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else if (currentTrack === track && isPlaying === false) {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setIsMusicPlayerVisible(true);
    }
  };

  useEffect(() => {
    fetch('/data/tracks.json')
      .then(response => response.json())
      .then((data: Track[]) => {
        const reversedTracks = [...data].reverse();
        setTracks(reversedTracks);
      })
      .catch(error => console.log(error));
  }, []);

  const handleBackwardClick = () => {
    const currentIndex = tracks.findIndex(
      track => track.id === currentTrack?.id
    );
    if (currentIndex > 0) {
      const previousTrack = tracks[currentIndex - 1];
      setCurrentTrack(previousTrack);
      setIsPlaying(true);
    }
  };

  const handleForwardClick = () => {
    const currentIndex = tracks.findIndex(
      track => track.id === currentTrack?.id
    );
    if (currentIndex < tracks.length - 1) {
      const nextTrack = tracks[currentIndex + 1];
      setCurrentTrack(nextTrack);
      setIsPlaying(true);
    }
  };

  return (
    <div className='w-full overflow-scroll z-auto'>
      <div className='m-0 p-0'>
        <MobileCatalog
          tracks={tracks}
          playTrack={playTrack}
          isPlaying={isPlaying}
        />
        {isMusicPlayerVisible &&
          currentTrack && ( // Check for currentTrack existence
            <MusicPlayer
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              audioRef={audioRef}
              playPreviousTrack={handleBackwardClick}
              playNextTrack={handleForwardClick}
            />
          )}
      </div>
    </div>
  );
};

export default Sounds;

'use client';
import React, { useState, useEffect } from 'react';
import { MobileCatalog, MiniPlayer } from '@/components/pages/Discover';
import { Track } from '@/types/track';

const Discover: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const audioRef = React.useRef<HTMLAudioElement>(
    null
  ) as React.MutableRefObject<HTMLAudioElement>;
  const [isPlaying, setIsPlaying] = useState(false);

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
    }
    console.log(currentTrack);
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

  return (
    <div className='m-0 p-0'>
      <div className='w-full overflow-scroll z-auto'>
        <div className='m-0 p-0'>
          <MobileCatalog
            tracks={tracks}
            playTrack={playTrack}
            isPlaying={isPlaying}
          />
        </div>
        <MiniPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
        />
      </div>
    </div>
  );
};

export default Discover;

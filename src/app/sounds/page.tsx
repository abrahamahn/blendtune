'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MobileCatalog, MiniPlayer } from '@/components/pages/Sounds';
import { Track } from '@/types/track';
import supabase from '@/lib/supabase/supabaseClient';

const Sounds: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function getData() {
      const { data } = await supabase.auth.getSession();
    }
    getData();
  }, []);
  console.log(data);
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
  };

  useEffect(() => {
    fetch('/data/tracks.json')
      .then(response => response.json())
      .then((data: Track[]) => {
        // Reverse the order of tracks here
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
            currentTrack={currentTrack}
            isPlaying={isPlaying}
          />
        </div>
        <MiniPlayer
          currentTrack={currentTrack}
          playTrack={playTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
        />
      </div>
    </div>
  );
};

export default Sounds;

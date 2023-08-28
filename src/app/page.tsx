'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import App from './app/page';
import Home from './home/page';
import * as types from '@/types/global';

const Index: React.FC<types.IndexProps> = () => {
  const [tracks, setTracks] = useState<types.Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<types.Track>(tracks[0]);
  const audioRef = React.useRef<HTMLAudioElement>(null) as React.MutableRefObject<HTMLAudioElement>;
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track: types.Track) => {
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

  const isAuthenticated = true;
  
  useEffect(() => {
    fetch('/data/tracks.json')
      .then(response => response.json())
      .then((data: types.Track[]) => {
        const reversedTracks = data.toReversed();
        setTracks(reversedTracks);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      {isAuthenticated ?
      <App 
        tracks={tracks}
        currentTrack={currentTrack}
        playTrack={playTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      /> : 
      <Home 
        tracks={tracks}
      />}
    </div>
  )
};

export default Index;

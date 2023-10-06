'use client';
import React, { useState, useEffect } from 'react';
import { Header, Footer } from '@/components/layouts';
import { Hero, NewTracks } from '@/components/pages/Home';
import AuthModal from '@/components/auth';
import { Track } from '@/types/track';

const Home: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState('signin');

  const openSignInModal = () => {
    setCurrentForm('signin');
    setAuthModalOpen(true);
  };

  const openSignUpModal = () => {
    setCurrentForm('signup');
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const audioRef = React.useRef<HTMLAudioElement>(
    null
  ) as React.MutableRefObject<HTMLAudioElement>;
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track: Track) => {
    if (currentTrack === track && isPlaying) {
      setIsPlaying(false); // Pause if the same track is selected and is currently playing
    } else if (currentTrack === track && !isPlaying) {
      setIsPlaying(true); // Play if the same track is selected and is currently paused
    } else {
      setCurrentTrack(track); // Update the current track if a different track is selected
      setIsPlaying(true); // And play it
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

  return (
    <div className='flex flex-col justify-center items-center w-full h-full bg-[var(--background-color)] overflow-x-scroll'>
      <main className='flex flex-col justify-center items-center w-full h-full bg-[var(--background-color)]'>
        <Header
          openSignInModal={openSignInModal}
          openSignUpModal={openSignUpModal}
        />
        <div className='w-full h-screen mx-auto'>
          <Hero openSignUpModal={openSignUpModal} />
        </div>
        <NewTracks
          currentTrack={currentTrack}
          tracks={tracks}
          playTrack={playTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
        />
        <Footer />
      </main>
      {authModalOpen && (
        <AuthModal closeAuthModal={closeAuthModal} form={currentForm} />
      )}
    </div>
  );
};

export default Home;

'use client';
import React, { useState, useEffect } from 'react';
import { Header, Footer } from '@/components/layouts';
import { Hero, NewTracks } from '@/components/pages/Home';
import AuthModal from '@/components/auth';
import { Track } from '@/types/track';

const Home: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState('signin');

  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState<number>(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch('/data/tracks.json')
      .then(response => response.json())
      .then((data: Track[]) => {
        const reversedTracks = [...data].reverse();
        setTracks(reversedTracks);
      })
      .catch(error => console.error(error));
  }, []);

  const togglePlayPause = (track: Track) => {
    if (track !== currentTrack) {
      setCurrentTrack(track);
      setIsPlaying(true);
      setPlaybackPosition(0);
    } else if (isPlaying) {
      setIsPlaying(false);
      setPlaybackPosition(audioRef.current?.currentTime || 0);
      audioRef.current?.pause();
    } else {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.currentTime = playbackPosition;
        audioRef.current
          .play()
          .catch(error => console.error('Play error:', error));
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const audioSrc = `/audio/tracks/${currentTrack?.file}`;

      if (currentTrack && audio.src !== audioSrc) {
        audio.src = audioSrc;
        audio.load();
      }

      if (isPlaying) {
        audio.currentTime = playbackPosition;
        audio.play().catch(error => console.error('Play error:', error));
      } else {
        audio.pause();
      }
    }

    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, [currentTrack, isPlaying, playbackPosition]);

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

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <header>
        <Header
          openSignInModal={openSignInModal}
          openSignUpModal={openSignUpModal}
        />
      </header>
      <main>
        <Hero openSignUpModal={openSignUpModal} />
        <NewTracks
          tracks={tracks}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          togglePlayPause={togglePlayPause}
          audioRef={audioRef}
        />
      </main>
      <footer>
        <Footer />
      </footer>
      {authModalOpen && (
        <AuthModal closeAuthModal={closeAuthModal} form={currentForm} />
      )}
    </div>
  );
};

export default Home;

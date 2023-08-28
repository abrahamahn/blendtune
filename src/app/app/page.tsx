import React, { useState, useEffect } from 'react';

import { Header, Footer, Catalog, MiniPlayer } from './components';

import * as types from '@/types/global';
import styles from './styles/page.css';

const App: React.FC<types.HomeProps> = ({ 
  tracks,
  currentTrack,
  playTrack,
  isPlaying,
  setIsPlaying,
  audioRef
}) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header />
        <div className={styles.center}>
          <div className={styles.catalogContainer}>
            <Catalog 
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
        <Footer />
      </main>
    </div>
  )
};

export default App;
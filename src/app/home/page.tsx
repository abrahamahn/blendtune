'use client';
import React from 'react';
import { Header, Footer, Hero, NewTracks, About1, About2, About3, Testimonials, Pricing } from './components';

import styles from './styles/page.css';
import { Track } from '@/types/global';

function Home({ tracks }: { tracks: Track[] }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header />
        <div className={styles.center}>
          <Hero />
          <NewTracks tracks={tracks} />
          <About1 tracks={tracks} />
          <About2 />
          <About3 tracks={tracks} />
          <Testimonials />
          <Pricing />
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default Home;
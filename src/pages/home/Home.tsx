import React from 'react';
import Head from 'next/head';
import { Hero, NewTracks, About1, About2, About3, Testimonials, Pricing } from '@/components/pages/home';
import { Header, Footer } from '@/components/layout/home';

import styles from './styles/Home.module.css';
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
};

export default Home;
import React, { useState, useRef } from 'react';
import Image from 'next/image';

import styles from '../styles/components/About3.module.css';
import { Track } from '@/types/global';

function About3({ tracks }: { tracks: Track[] }) {
  return (
    <>
      <div className={styles.about_container}>
        <div className={styles.about_text}>
          <h2 className={styles.about_title}>Curated to inspire</h2>
          <p className={styles.about_description}>Experience the ultimate music discovery platform curated by industry experts. Our daily updates and mood-based categories make it easy to find the perfect sound to match your vision.</p>
        </div>
        <div className={styles.about_button}>
          <button className={styles.about_button_text}>
            <p>Explore Selections</p>
          </button>
        </div>
      </div>
    </>
  )
}

export default About3;
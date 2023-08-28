import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/components/NewTracks.module.css';
import { Track } from '@/types/global';
function NewTracks({ tracks }: { tracks: Track[] }) {
  return (
    <div className={styles.newtracks_container}>
      <div className={styles.newtracks_title_container}>
        <h2 className={styles.newtracks_maintitle}>
          New Release
        </h2>
      </div>
    </div>
  );
}

export default NewTracks;
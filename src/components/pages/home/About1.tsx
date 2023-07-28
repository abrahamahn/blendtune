import React from 'react';
import styles from '@/pages/home/styles/components/About1.module.css';
import * as Icon from '@/components/icons';
import { Track } from '@/types/global';

function About({ tracks }: { tracks: Track[] }) {
  return (
    <>
      <div className={styles.about}>
        <div className={styles.title_description}>
          <h2 className={styles.about_title}>End of creative block</h2>
          <p className={styles.about_description}>Unlock a new level of productivity. Say goodbye to endless scrolling and create standout tracks in record time.</p>
        </div>
        <div className={styles.description_cards}>
          <div className={styles.description_card}>
            <div className={styles.music_icon_container}>
              <Icon.Music 
                className={styles.music_icon} 
                width={50}
                height={50} />
            </div>
            <div className={styles.description_card_text}>
              <h3 className={styles.description_card_title}>Unleash Creativity</h3>
              <p className={styles.description_card_description}>
                Discover a world of creative possibilities at your fingertips. Create your track in one place.
              </p>
            </div>
          </div>
          <div className={styles.description_card}>
            <div className={styles.headphone_icon_container}>
              <Icon.Headphone
                className={styles.headphone_icon} 
                width={50}
                height={50} />
            </div>
            <div className={styles.description_card_text}>
              <h3 className={styles.description_card_title}>Superior Quality</h3>
              <p className={styles.description_card_description}>
                Browse tracks from the world's top producers using our advanced filtering system.
              </p>
            </div>
          </div>
          <div className={styles.description_card}>
            <div className={styles.record_icon_container}>
              <Icon.Record
                className={styles.record_icon} 
                width={50}
                height={50} />
            </div>
            <div className={styles.description_card_text}>
              <h3 className={styles.description_card_title}>Record Your Voice</h3>
              <p className={styles.description_card_description}>
                Use our built-in voice recorder to add your own unique vocals and create a masterpiece.
              </p>
            </div>
          </div>
          <div className={styles.description_card}>
            <div className={styles.volume_icon_container}>
              <Icon.Volume
                className={styles.volume_icon} 
                width={50}
                height={50} />
            </div>
            <div className={styles.description_card_text}>
              <h3 className={styles.description_card_title}>Advanced Filtering</h3>
              <p className={styles.description_card_description}>
                Create a complete track with ease with our advanced vocal effects.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.about_button}>
          <button className={styles.about_button_text}>
            <p>Start Creating</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default About;


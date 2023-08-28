import React from 'react'
import Image from 'next/image'

import styles from '../styles/components/About2.module.css'

function About2() {
  return (
    <>
      <div className={styles.about_container}>
        <div className={styles.motion_container}>
        </div>
        <div className={styles.about_text}>
          <h2 className={styles.about_title}>See the difference</h2>
          <p className={styles.about_description}>Break free from creative constraints with our all-in-one platform. From idea to finished track, our powerful tools and user-friendly interface make music production effortless and fun.</p>
        </div>
        <div className={styles.button}>
          <button className={styles.about_button_text}>
            <p>Explore Tracks</p>
          </button>
        </div>
      </div>
    </>
  )
}

export default About2
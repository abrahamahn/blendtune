import React from 'react';
import styles from '../styles/components/Testimonials.module.css';

const testimonialsData = [
  {
    imageSrc: "/images/testimonials/1.jpg",
    description: "I&apos;m blown away by the productivity I&apos;ve achieved since using this platform. With endless scrolling a thing of the past, I&apos;m able to create standout tracks in record time. It&apos;s a game-changer.",
    name: "Post Malone",
    subtext: "American rapper, singer, songwriter, and record producer",
  },
  {
    imageSrc: "/images/testimonials/2.jpg",
    description: "As an artist, I&apos;m always looking for new ways to unleash my creativity. This platform has given me everything I need - browsing, downloading, recording, mixing and mastering all in one place. It&apos;s amazing.",
    name: "Quavo",
    subtext: "American rapper and record producer",
  },
  {
    imageSrc: "/images/testimonials/3.jpg",
    description: "I only work with the best, and this platform is no exception. With tracks from the world&apos;s top producers and the advanced filtering system, it makes finding the perfect beat a breeze.",
    name: "Cardi B",
    subtext: "American rapper and record producer",
  },
  {
    imageSrc: "/images/testimonials/4.jpg",
    description: "With the built-in voice recorder, I can make my mark on every beat. It&apos;s never been easier to add my own unique vocals and create a masterpiece. This platform is a game-changer for music producers everywhere.",
    name: "Lil Wayne",
    subtext: "American rapper and record producer",
  },
  {
    imageSrc: "/images/testimonials/5.jpg",
    description: "I can tell you that this platform is the real deal. With advanced vocal presets and effects, I can master the art of music production in minutes. It&apos;s an all-in-one platform that truly breaks free from creative constraints.",
    name: "Snoop Dogg",
    subtext: "American record producer",
  },
];

function Testimonials() {
  return (
    <>
      <div className={styles.testimonials}>
        <h2 className={styles.testimonials_title}>Testimonials</h2>
        <div className={styles.testimonials_card_container}>
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className={styles.testimonials_card}>
              <div className={styles.testimonials_image_container}>
                <img className={styles.testimonials_image} src={testimonial.imageSrc} alt={`testimonial-${index + 1}`} />
              </div>
              <div className={styles.testimonials_text}>
                <p className={styles.testimonials_description}>{testimonial.description}</p>
              </div>
              <div className={styles.testimonials_name}>
                <p className={styles.testimonials_name_text}>{testimonial.name}</p>
                <p className={styles.testimonials_name_subtext}>{testimonial.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Testimonials;
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

interface HeroProps {
  openSignUpModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ openSignUpModal }) => {
  const artworks = Array.from(
    { length: 999 },
    (_, i) => `/images/artwork/CRB${String(i + 1).padStart(3, '0')}.jpg`
  );

  const chunks = [
    artworks.slice(0, 12),
    artworks.slice(12, 24),
    artworks.slice(24, 36),
    artworks.slice(36, 48),
    artworks.slice(48, 60),
  ];

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <div className='flex flex-col justify-center items-center text-white relative w-full h-96 md:h-screen overflow-hidden mt-24 md:mt-0'>
        <div className='absolute top-0 left-0 right-0 bottom-0 md:h-4/6 flex justify-center overflow-visible'>
          {chunks.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className={`${styles.column} ${
                chunkIndex % 2 === 0 ? styles.up : styles.down
              }`}
            >
              {chunk.map((art, artIndex) => (
                <div
                  key={artIndex}
                  className='relative z-0 m-1 overflow-visible'
                >
                  <div className='vintage-cover relative'>
                    {/* Div for Mobile View */}
                    <div className='block sm:hidden'>
                      <Image
                        src={art}
                        alt='artwork'
                        width={110}
                        height={110}
                        className='object-cover w-full border-black rounded-xl'
                      />
                    </div>
                    {/* Div for Desktop View */}
                    <div className='hidden sm:block'>
                      <Image
                        src={art}
                        alt='artwork'
                        width={200}
                        height={200}
                        className='object-cover w-full border-black rounded-xl'
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.overlay}></div>
        <div className='flex flex-col justify-center items-center text-center w-full md:h-5/6 z-10 px-10'>
          <div
            className={`flex flex-col justify-center text-center w-full md:w-4/6 lg:w-3/4 xl:w-4/5 mb-5 mt-24 md:mt-48 ${styles.fadeInUp}`}
          >
            <h1
              className={`font-custom text-3xl font-medium mb-3 mx-auto leading-tight xl:text-6xl lg:text-5xl md:text-3xl ${styles.fadeInUp}`}
            >
              World&apos;s best web studio and music library
            </h1>
            <p
              className={`text-center text-neutral-400 text-sm md:text-base lg:text-lg xl:text-xl mx-auto w-full sm:w-3/4 md:w-4/5 lg:w-3/5 xl:w-1/2 2xl:w-1/2 mb-4 ${styles.fadeInUp}`}
            >
              Create your masterpiece with highly-curated instrumentals, and
              share it with the world.
            </p>
          </div>
          <div className={`flex justify-center ${styles.fadeInUp}`}>
            <Link
              className='md:w-56 w-40 text-sm md:text-base text-white rounded-full py-3 sm:py-4 px-10 bg-neutral-800 hover:bg-neutral-700 mr-4 font-semibold'
              href='/sounds'
            >
              Explore
            </Link>
            <button
              onClick={openSignUpModal}
              className='md:w-56 w-40 text-sm md:text-base text-white rounded-full py-3 md:py-4 px-10 bg-indigo-700 hover:bg-indigo-800 cursor-pointer font-semibold'
            >
              Try Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

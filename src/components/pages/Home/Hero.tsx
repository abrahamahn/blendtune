import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Home/Hero.module.css';

interface HeroProps {
  openSignUpModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ openSignUpModal }) => {
  // Generating array of artwork image file paths
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
    <div className='flex flex-col justify-center items-center text-white relative w-full h-full overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center overflow-visible z-0'>
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
                className='relative z-0 m-1.5 overflow-visible'
              >
                <div className='vintage-cover relative'>
                  <Image
                    src={art}
                    alt='artwork'
                    width={1000}
                    height={1000}
                    className='object-cover w-full h-auto border-0 border-black rounded-xl'
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.overlay}></div>
      <div className='flex flex-col justify-center items-center text-center w-full h-full z-10 mt-64'>
        <div className='flex flex-col justify-center text-center w-4/5 mb-10 px-8'>
          <h1 className='font-custom text-6xl font-medium mb-2.5 px-5 mx-auto leading-tight'>
            World&apos;s best web studio and music library.
          </h1>
          <p className='text-center text-neutral-400 text-xl w-3/6 mx-auto'>
            Create your masterpiece with highly-curated instrumentals, and share
            it with the world.
          </p>
        </div>
        <div className='flex justify-center'>
          <Link
            className='w-40 text-md text-white rounded-full py-4 px-10 mr-5 bg-neutral-800 hover:bg-neutral-900'
            href='/sounds'
          >
            Explore
          </Link>
          <button
            onClick={openSignUpModal}
            className='w-40 text-md text-white rounded-full py-4 px-10 duration-300 bg-indigo-700 hover:bg-indigo-800 cursor-pointer'
          >
            Try Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

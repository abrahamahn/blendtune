import React from 'react';
import Image from 'next/image';

const testimonialsData = [
  {
    imageSrc: '/images/testimonials/1.jpg',
    description:
      'I&apos;m blown away by the productivity I&apos;ve achieved since using this platform. With endless scrolling a thing of the past, I&apos;m able to create standout tracks in record time. It&apos;s a game-changer.',
    name: 'Post Malone',
    subtext: 'American rapper, singer, songwriter, and record producer',
  },
  {
    imageSrc: '/images/testimonials/2.jpg',
    description:
      'As an artist, I&apos;m always looking for new ways to unleash my creativity. This platform has given me everything I need - browsing, downloading, recording, mixing and mastering all in one place. It&apos;s amazing.',
    name: 'Quavo',
    subtext: 'American rapper and record producer',
  },
  {
    imageSrc: '/images/testimonials/3.jpg',
    description:
      'I only work with the best, and this platform is no exception. With tracks from the world&apos;s top producers and the advanced filtering system, it makes finding the perfect beat a breeze.',
    name: 'Cardi B',
    subtext: 'American rapper and record producer',
  },
  {
    imageSrc: '/images/testimonials/4.jpg',
    description:
      'With the built-in voice recorder, I can make my mark on every beat. It&apos;s never been easier to add my own unique vocals and create a masterpiece. This platform is a game-changer for music producers everywhere.',
    name: 'Lil Wayne',
    subtext: 'American rapper and record producer',
  },
  {
    imageSrc: '/images/testimonials/5.jpg',
    description:
      'I can tell you that this platform is the real deal. With advanced vocal presets and effects, I can master the art of music production in minutes. It&apos;s an all-in-one platform that truly breaks free from creative constraints.',
    name: 'Snoop Dogg',
    subtext: 'American record producer',
  },
];

function Testimonials() {
  return (
    <>
      <div className='text-white py-16'>
        <h2 className='text-center text-5xl font-medium mb-8'>Testimonials</h2>
        <div className='flex overflow-x-scroll px-5 space-x-8'>
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className='flex-none w-64 rounded-lg overflow-hidden shadow-lg transition-transform duration-200 ease-in-out border border-gray-400'
            >
              <div className='w-64 h-38'>
                <Image
                  className='w-full h-full object-cover'
                  width='100'
                  height='100'
                  src={testimonial.imageSrc}
                  alt={`testimonial-${index + 1}`}
                />
              </div>
              <div className='p-5 h-36'>
                <p className='text-sm text-gray-400 leading-snug'>
                  {testimonial.description}
                </p>
              </div>
              <div className='flex flex-col justify-start items-start p-5 pb-6'>
                <p className='text-lg font-bold mb-1'>{testimonial.name}</p>
                <p className='text-sm text-gray-400'>{testimonial.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Testimonials;

import React from 'react';
import { Header, Footer } from '@/components/layouts';
import { Hero } from '@/components/pages/Home/';

const Home: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full bg-[var(--background-color)] overflow-x-scroll'>
      <main className='flex flex-col justify-center items-center w-full h-full bg-[var(--background-color)]'>
        <Header />
        <div className='w-full h-screen mx-auto'>
          <Hero />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Home;

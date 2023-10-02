'use client';
import React, { useState } from 'react';
import { Header, Footer } from '@/components/layouts';
import { Hero } from '@/components/pages/Home/';
import AuthModal from '@/components/auth';

const Home: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <div className='flex flex-col justify-center items-center w-full h-full bg-[var(--background-color)] overflow-x-scroll'>
      <main className='flex flex-col justify-center items-center w-full h-full bg-[var(--background-color)]'>
        <Header openAuthModal={openAuthModal} />
        <div className='w-full h-screen mx-auto'>
          <Hero />
        </div>
        <Footer />
      </main>
      {authModalOpen && <AuthModal closeAuthModal={closeAuthModal} />}
    </div>
  );
};

export default Home;

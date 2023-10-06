'use client';
import React, { useState } from 'react';
import { Header, Footer } from '@/components/layouts';
import { Hero, NewTracks } from '@/components/pages/Home';
import AuthModal from '@/components/auth';

const Home: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState('signin');

  const openSignInModal = () => {
    setCurrentForm('signin');
    setAuthModalOpen(true);
  };

  const openSignUpModal = () => {
    setCurrentForm('signup');
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <div className='flex flex-col justify-center items-center w-full h-full bg-[var(--background-color)] overflow-x-scroll'>
      <main className='flex flex-col justify-center items-center w-full h-full bg-[var(--background-color)]'>
        <Header
          openSignInModal={openSignInModal}
          openSignUpModal={openSignUpModal}
        />
        <div className='w-full h-screen mx-auto'>
          <Hero openSignUpModal={openSignUpModal} />
        </div>
        <NewTracks />
        <Footer />
      </main>
      {authModalOpen && (
        <AuthModal closeAuthModal={closeAuthModal} form={currentForm} />
      )}
    </div>
  );
};

export default Home;

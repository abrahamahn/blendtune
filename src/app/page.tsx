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
    <div className='w-full h-screen overflow-x-scroll bg-black m-0 p-0'>
      <main className='flex flex-col justify-center items-center'>
        <Header
          openSignInModal={openSignInModal}
          openSignUpModal={openSignUpModal}
        />
        <div className='w-full'>
          <Hero openSignUpModal={openSignUpModal} />
        </div>
        <div className='w-full'>
          <NewTracks />
        </div>
        <Footer />
      </main>
      {authModalOpen && (
        <AuthModal closeAuthModal={closeAuthModal} form={currentForm} />
      )}
    </div>
  );
};

export default Home;

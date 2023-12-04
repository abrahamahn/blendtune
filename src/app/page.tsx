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
    <div className='flex flex-col min-h-screen'>
      <header>
        <Header
          openSignInModal={openSignInModal}
          openSignUpModal={openSignUpModal}
        />
      </header>
      <main>
        <Hero openSignUpModal={openSignUpModal} />
        <NewTracks />
      </main>
      <footer>
        <Footer />
      </footer>
      {authModalOpen && (
        <AuthModal closeAuthModal={closeAuthModal} form={currentForm} />
      )}
    </div>
  );
};

export default Home;

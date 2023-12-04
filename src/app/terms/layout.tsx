'use client';
import React, { useState } from 'react';
import { Header, Footer } from '@/components/layouts';
import AuthModal from '@/components/auth';

export default function SoundsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
      {authModalOpen && (
        <AuthModal closeAuthModal={closeAuthModal} form={currentForm} />
      )}
    </div>
  );
}

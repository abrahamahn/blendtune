'use client';
import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

interface AuthModalProps {
  closeAuthModal: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ closeAuthModal }) => {
  const [showSignIn, setShowSignIn] = useState(true);

  const openSignInModal = () => {
    setShowSignIn(true);
  };

  const openSignUpModal = () => {
    setShowSignIn(false);
  };

  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={closeAuthModal}
      className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-opacity-60 bg-black'
    >
      <div
        onClick={handleModalContentClick}
        className={`${
          showSignIn ? 'bg-gray-900' : 'bg-gray-900'
        } w-80 p-4 rounded-lg border border-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      >
        {showSignIn ? (
          <SignIn
            openSignInModal={openSignInModal}
            openSignUpModal={openSignUpModal}
          />
        ) : (
          <SignUp
            openSignInModal={openSignInModal}
            openSignUpModal={openSignUpModal}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;

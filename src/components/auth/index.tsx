import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import VerifyEmail from './VerifyEmail';
import ConfirmSignUp from './ConfirmSignUp';

interface AuthModalProps {
  closeAuthModal: () => void;
  form?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({
  closeAuthModal,
  form = 'signin',
}) => {
  const [showSignIn, setShowSignIn] = useState(form === 'signin');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [showConfirmSignUp, setShowConfirmSignUp] = useState(false);

  const openSignIn = () => {
    setShowSignIn(true);
    setShowResetPassword(false);
    setShowVerifyEmail(false);
    setShowConfirmSignUp(false);
  };

  const openSignUp = () => {
    setShowSignIn(false);
    setShowResetPassword(false);
    setShowVerifyEmail(false);
    setShowConfirmSignUp(false);
  };

  const openResetPassword = () => {
    setShowSignIn(false);
    setShowResetPassword(true);
    setShowVerifyEmail(false);
    setShowConfirmSignUp(false);
  };

  const openVerifyEmail = () => {
    setShowSignIn(false);
    setShowResetPassword(false);
    setShowVerifyEmail(true);
    setShowConfirmSignUp(false);
  };

  const openConfirmSignUp = () => {
    setShowSignIn(false);
    setShowResetPassword(false);
    setShowVerifyEmail(false);
    setShowConfirmSignUp(true);
  };

  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  let modalContent;

  if (showSignIn) {
    modalContent = (
      <SignIn openSignUp={openSignUp} openResetPassword={openResetPassword} />
    );
  } else if (showResetPassword) {
    modalContent = (
      <ResetPassword
        openSignIn={openSignIn}
        openVerifyEmail={openVerifyEmail}
      />
    );
  } else if (showVerifyEmail) {
    modalContent = <VerifyEmail openSignIn={openSignIn} />;
  } else if (showConfirmSignUp) {
    modalContent = <ConfirmSignUp />;
  } else {
    modalContent = (
      <SignUp openSignIn={openSignIn} openConfirmSignUp={openConfirmSignUp} />
    );
  }

  return (
    <div
      onClick={closeAuthModal}
      className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-opacity-60 bg-black z-20'
    >
      <div
        onClick={handleModalContentClick}
        className={`${
          showSignIn || showResetPassword || showVerifyEmail
            ? 'bg-gray-900'
            : 'bg-gray-900'
        } w-80 p-4 rounded-lg border border-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30`}
      >
        {modalContent}
      </div>
    </div>
  );
};

export default AuthModal;

import React from 'react';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link
      className='text-black dark:text-white text-3xl font-extrabold tracking-tighter rounded-lg p-2'
      href='/'
    >
      BLEND.
    </Link>
  );
};

export default Logo;

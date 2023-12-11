import React from 'react';
import {
  faYoutube,
  faInstagram,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Logo from '@/components/common/shared/Logo';
import SocialIcon from '@/components/common/shared/SocialIcons';

function ListSection({
  title,
  items,
}: {
  title: string;
  items: { name: string; url: string }[];
}) {
  return (
    <div>
      <h3 className='text-lg text-gray-400 mb-1 font-medium'>{title}</h3>
      <ul className='list-none'>
        {items.map(item => (
          <li key={item.name} className='mb-2'>
            <a
              href={item.url}
              className='text-indigo-500 hover:text-gray-300 md:text-sm text-sm'
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Footer = () => {
  const sections = [
    {
      title: 'Music',
      items: [{ name: 'Sounds', url: '/sounds' }],
    },
    {
      title: 'Support',
      items: [
        { name: 'Help', url: '/help' },
        { name: 'Licensing', url: '/licensing' },
        { name: 'Contact Support', url: '/contact-support' },
        { name: 'Feedback', url: '/feedback' },
      ],
    },
    {
      title: 'Social Media',
      items: [
        { name: 'Youtube', url: 'https://www.youtube.com' },
        { name: 'Instagram', url: 'https://www.instagram.com/' },
        { name: 'Facebook', url: 'https://www.facebook.com' },
        { name: 'Twitter', url: 'https://www.twitter.com' },
      ],
    },
    {
      title: 'Account',
      items: [
        { name: 'Sign In', url: '/auth/signin' },
        { name: 'Sign Up', url: '/auth/signup' },
        { name: 'Forgot Password', url: '/auth/reset-password' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { name: 'Terms of Use', url: '/terms' },
        { name: 'Privacy Policy', url: '/privacy-policy' },
      ],
    },
  ];

  return (
    <div className='flex flex-col lg:flex-row w-full justify-center items-center h-auto px-4 md:px-10 lg:px-0 pt-0 pb-16 lg:pb-24'>
      <div className='flex flex-wrap gap-0 lg:justify-center md:gap-10 mt-8 lg:order-2'>
        {sections.map(section => (
          <div
            key={section.title}
            className='lg:ml-2 text-base w-1/2 md:w-28 lg:w-32 md:mb-0 mb-6'
          >
            <ListSection title={section.title} items={section.items} />
          </div>
        ))}
      </div>
      {/* Left Section (20%) - Displayed below on mobile */}
      <div className='ml-0 sm:ml-0 md:ml-12 lg:ml-0 xl:ml-0 w-full lg:w-72 flex flex-col lg:justify-center mt-8 lg:order-1'>
        <Logo />
        <div className='flex mb-8 space-x-2 md:space-x-1 lg:space-x-2'>
          <SocialIcon icon={faYoutube} />
          <SocialIcon icon={faInstagram} />
          <SocialIcon icon={faFacebook} />
          <SocialIcon icon={faTwitter} />
        </div>
        <p className='text-xs text-neutral-400 mb-8'>
          © 2023 Blend, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

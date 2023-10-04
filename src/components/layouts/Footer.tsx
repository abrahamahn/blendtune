import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faYoutube,
  faInstagram,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

function SocialIcon({ icon }: { icon: IconDefinition }) {
  return (
    <a
      href='#'
      className='w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center'
    >
      <FontAwesomeIcon icon={icon} style={{ color: '#ffffff' }} />
    </a>
  );
}

function ListSection({
  title,
  items,
}: {
  title: string;
  items: { name: string; url: string }[];
}) {
  return (
    <div>
      <h3 className='text-lg text-gray-500 mb-2 font-medium'>{title}</h3>
      <ul className='list-none text-sm'>
        {items.map(item => (
          <li key={item.name} className='mb-2'>
            <a href={item.url} className='text-indigo-700 hover:text-gray-300'>
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
        { name: 'Instagram', url: 'https://www.instagram.com' },
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
    <div className='w-full h-72 bg-black'>
      <div className='w-4/5 h-full flex py-5 px-5 mx-auto'>
        {/* Left Section (20%) */}
        <div className='w-1/5 flex flex-col items-start justify-center mx-auto space-y-4'>
          <h1 className='text-4xl font-extrabold tracking-tighter'>BLEND.</h1>
          <div className='flex space-x-2'>
            <SocialIcon icon={faYoutube} />
            <SocialIcon icon={faInstagram} />
            <SocialIcon icon={faFacebook} />
            <SocialIcon icon={faTwitter} />
          </div>
          <p className='text-xs text-neutral-400'>
            © 2023 Blend, Inc. All rights reserved.
          </p>
        </div>
        {/* Right Section (80%) */}
        <div className='w-4/5 grid grid-cols-5 gap-10 mx-auto mt-8'>
          {sections.map(section => (
            <ListSection
              key={section.title}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

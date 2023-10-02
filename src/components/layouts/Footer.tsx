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

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className='text-lg text-gray-500 mb-2 font-medium'>{title}</h3>
      <ul className='list-none text-sm'>
        {items.map(item => (
          <li key={item} className='mb-2'>
            <a href='#' className='text-indigo-700 hover:text-gray-300'>
              {item}
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
      items: ['Beats', 'Packs', 'Selections', 'Creators', 'Free samples'],
    },
    {
      title: 'Support',
      items: ['Help', 'Licensing', 'Contact Support', 'Feedback'],
    },
    {
      title: 'Social Media',
      items: ['Youtube', 'Instagram', 'Facebook', 'Twitter'],
    },
    { title: 'Account', items: ['Start Selling', 'Subscribe', 'Sign In'] },
    { title: 'Legal', items: ['Terms of Use', 'Privacy Policy'] },
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

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
    <div className='w-full items-center mx-auto'>
      <h3 className='text-lg text-gray-500 mb-2 font-medium'>{title}</h3>
      <ul className='list-none'>
        {items.map(item => (
          <li key={item.name} className='mb-2'>
            <a
              href={item.url}
              className='text-indigo-700 hover:text-gray-300 md:text-sm text-base'
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
    <div className='w-full h-72 flex-row md:flex-col mx-auto md:px-10'>
      <div className='md:w-full flex py-5 px-5 mx-auto flex-wrap'>
        <div className='w-full md:w-4/5 flex md:flex-row flex-wrap gap-0 md:gap-10 mx-auto mt-8 order-1 md:order-2'>
          {sections.map(section => (
            <div key={section.title} className='w-1/2 md:w-36 md:mb-0 mb-6'>
              <ListSection title={section.title} items={section.items} />
            </div>
          ))}
        </div>

        {/* Left Section (20%) - Displayed below on mobile */}
        <div className='w-full md:w-1/5 flex flex-col items-start justify-center mx-auto space-y-4 order-2 md:order-1'>
          <Logo />
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
      </div>
    </div>
  );
};

export default Footer;

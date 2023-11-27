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
    <div className='xl:w-full lg:w-full items-center mx-auto'>
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
    <div className='xl:w-full lg:w-full md:full h-72 bg-black flex-row md:flex-col px-6'>
      <div className='xl:w-full lg:w-full md:full flex py-5 px-5 mx-auto  flex-wrap'>
        {/* Left Section (20%) */}
        <div className='w-1/5 flex flex-col items-start justify-center mx-auto space-y-4 order-2 md:order-1'>
          {/* This component will be hidden on medium-sized screens and smaller */}
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
        {/* List Sections (80%) */}
        <div className='w-4/5 flex flex-row gap-10 mx-auto mt-8 order-1 md:order-2'>
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

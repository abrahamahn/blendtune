import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

interface SocialIconProps {
  icon: IconDefinition;
}

interface SocialMediaUrls {
  [key: string]: string;
}

const socialMediaUrls: SocialMediaUrls = {
  faYoutube: 'https://www.youtube.com',
  faInstagram: 'https://www.instagram.com',
  faFacebook: 'https://www.facebook.com',
  faTwitter: 'https://www.twitter.com',
};

const SocialIcon: React.FC<SocialIconProps> = ({ icon }) => {
  const url = socialMediaUrls[icon.iconName as string];

  return (
    <a
      href={url}
      className='w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center'
    >
      <FontAwesomeIcon icon={icon} style={{ color: '#ffffff' }} />
    </a>
  );
};

export default SocialIcon;

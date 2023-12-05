import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRecordVinyl,
  faCubes,
  faThumbsUp,
  faFire,
  faWandSparkles,
  faUserLarge,
  faBolt,
  faStar,
  faGem,
  faMoneyBill,
  faWater,
  faLeaf,
  faPaw,
  faBurst,
  faBoltLightning,
  faDrum,
  faGuitar,
  faBarsStaggered,
  faMicrophoneLines,
  faMemory,
  faWaveSquare,
  faDrumSteelpan,
  faLinesLeaning,
} from '@fortawesome/free-solid-svg-icons';

interface DropdownMenuProps {
  isSoundsHovered: boolean;
  toggleSoundsHover: () => void;
}

const menuItems = [
  { icon: faRecordVinyl, text: 'Sounds' },
  { icon: faCubes, text: 'Packs' },
  { icon: faThumbsUp, text: 'Selections' },
  { icon: faFire, text: 'Popular' },
  { icon: faWandSparkles, text: 'Newest' },
  { icon: faUserLarge, text: 'Creators' },
  { icon: faBolt, text: 'Free Beats' },
];

const genreItems = [
  { icon: faStar, text: 'Pop' },
  { icon: faGem, text: 'Hip-Hop' },
  { icon: faMoneyBill, text: 'Trap' },
  { icon: faWater, text: 'R&B' },
  { icon: faLeaf, text: 'Reggaeton' },
  { icon: faPaw, text: 'Afrobeat' },
  { icon: faBurst, text: 'Rock' },
  { icon: faBoltLightning, text: 'Electronic' },
];

const instrumentItems = [
  { icon: faDrum, text: 'Drums' },
  { icon: faGuitar, text: 'Guitars' },
  { icon: faBarsStaggered, text: 'Bass' },
  { icon: faMicrophoneLines, text: 'Vocals' },
  { icon: faWaveSquare, text: 'Synth' },
  { icon: faMemory, text: 'Keyboard' },
  { icon: faDrumSteelpan, text: 'Percussion' },
  { icon: faLinesLeaning, text: 'Strings' },
];

const DropdownMenu: React.FC<DropdownMenuProps> = () => {
  return (
    <div className='flex absolute top-10 pt-1 bg-neutral-800 rounded-2xl shadow-lg'>
      <div className='flex-1 py-4 px-4 pr-2 w-96 border-r border-neutral-700 text-neutral-500 text-xs'>
        <h4 className='mb-2 ml-2'>EXPLORE</h4>
        <ul className='text-neutral-400 text-sm'>
          {menuItems.slice(0, 4).map((item, index) => (
            <li
              key={index}
              className='mb-1 hover:text-neutral-200 hover:bg-neutral-600 rounded-lg'
            >
              <Link className='flex flex-row px-2 py-1.5' href='/sounds'>
                <div className='flex items-center w-4'>
                  <FontAwesomeIcon
                    icon={item.icon}
                    className='justify-center items-center'
                  />
                </div>
                <p className='ml-2'>{item.text}</p>
              </Link>
            </li>
          ))}
          <li className='border border-t-0 border-neutral-600 my-5'></li>
          {menuItems.slice(4).map((item, index) => (
            <li
              key={index}
              className='mb-1 hover:text-neutral-200 hover:bg-neutral-600 rounded-lg'
            >
              <Link className='flex flex-row px-2 py-1.5' href='/sounds'>
                <div className='flex items-center w-4'>
                  <FontAwesomeIcon
                    icon={item.icon}
                    className='justify-center items-center'
                  />
                </div>
                <p className='ml-2'>{item.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex-1 py-4 px-2  border-r border-neutral-700 text-neutral-500 text-xs'>
        <h4 className='mb-2 ml-2'>GENRES</h4>
        <ul className='text-neutral-400 text-sm'>
          {genreItems.map((item, index) => (
            <li
              key={index}
              className='mb-1 hover:text-neutral-200 hover:bg-neutral-600 rounded-lg'
            >
              <Link className='flex flex-row px-2 py-1.5' href='/sounds'>
                <div className='flex items-center w-4'>
                  <FontAwesomeIcon
                    icon={item.icon}
                    className='justify-center items-center'
                  />
                </div>
                <p className='ml-2'>{item.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex-1 py-4 px-2 text-neutral-500 text-xs'>
        <h4 className='mb-2 ml-2'>INSTRUMENTS</h4>
        <ul className='text-neutral-400 text-sm'>
          {instrumentItems.map((item, index) => (
            <li
              key={index}
              className='mb-1 hover:text-neutral-200 hover:bg-neutral-600 rounded-lg'
            >
              <Link className='flex flex-row px-2 py-1.5' href='/sounds'>
                <div className='flex items-center w-4'>
                  <FontAwesomeIcon
                    icon={item.icon}
                    className='justify-center items-center'
                  />
                </div>
                <p className='ml-2'>{item.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;

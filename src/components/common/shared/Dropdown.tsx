import React from 'react';
import Link from 'next/link';

interface DropdownMenuProps {
  isSoundsHovered: boolean;
  toggleSoundsHover: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = () => {
  return (
    <div className='flex absolute top-10 pt-1  bg-neutral-800 rounded-2xl'>
      <div className='flex-1 p-4 w-96 pl-5 border-r border-neutral-700 text-neutral-500 text-xs'>
        <h4 className='mb-3'>EXPLORE</h4>
        <ul className='text-neutral-400 text-sm'>
          <li className='mb-3'>
            <Link href='/sounds'>
              <p>Sounds</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/packs'>
              <p>Packs</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/selections'>
              <p>Selections</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/popular'>
              <p>Popular</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/newest'>
              <p>Newest</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/creators'>
              <p>Creators</p>
            </Link>
          </li>
          <li>
            <Link href='/free-beats'>
              <p>Free Beats</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex-1 p-4 w-pl-5  border-r border-neutral-700 text-neutral-500 text-xs'>
        <h4 className='mb-3'>GENRES</h4>
        <ul className='text-neutral-400 text-sm'>
          <li className='mb-3'>
            <Link href='/pop'>
              <p className=''>Pop</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/hip-hop'>
              <p>Hip-Hop</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/trap'>
              <p>Trap</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/r&b'>
              <p>R&B</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/reggaeton'>
              <p>Reggaeton</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/afrobeat'>
              <p>Afrobeat</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/rock'>
              <p>Rock</p>
            </Link>
          </li>
          <li>
            <Link href='/electronic'>
              <p>Electronic</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex-1 p-4 pl-5 text-neutral-500 text-xs'>
        <h4 className='mb-3'>INSTRUMENTS</h4>
        <ul className='text-neutral-400 text-sm'>
          <li className='mb-3'>
            <Link href='/drums'>
              <p>Drums</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/guitars'>
              <p>Guitars</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/bass'>
              <p>Bass</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/vocals'>
              <p>Vocals</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/synth'>
              <p>Synth</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/piano'>
              <p>Piano</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/keyboard'>
              <p>Keyboard</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/percussion'>
              <p>Percussion</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/strings'>
              <p>Strings</p>
            </Link>
          </li>
          <li>
            <Link href='/brass'>
              <p>Brass</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;

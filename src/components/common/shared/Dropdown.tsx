import React from 'react';
import Link from 'next/link';

interface DropdownMenuProps {
  isSoundsHovered: boolean;
  toggleSoundsHover: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = () => {
  return (
    <div className='absolute top-10 left-2 px-0 pt-1 flex bg-neutral-800 rounded-2xl'>
      <div className='flex-1 p-4 w-96 pl-5 border-r border-neutral-700'>
        <h4 className='text-neutral-500 text-xs mb-3'>EXPLORE</h4>
        <ul className='list-none p-0 m-0'>
          <li className='mb-3'>
            <Link href='/sounds'>
              <p className='text-neutral-400 text-sm'>Sounds</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/packs'>
              <p className='text-neutral-400 text-sm'>Packs</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/selections'>
              <p className='text-neutral-400 text-sm'>Selections</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/popular'>
              <p className='text-neutral-400 text-sm'>Popular</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/newest'>
              <p className='text-neutral-400 text-sm'>Newest</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/creators'>
              <p className='text-neutral-400 text-sm'>Creators</p>
            </Link>
          </li>
          <li>
            <Link href='/free-beats'>
              <p className='text-neutral-400 text-sm'>Free Beats</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex-1 p-4 w-pl-5  border-r border-neutral-700'>
        <h4 className='text-neutral-500 text-xs mb-3'>GENRES</h4>
        <ul className='list-none p-0 m-0'>
          <li className='mb-3'>
            <Link href='/pop'>
              <p className='text-neutral-400 text-sm'>Pop</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/hip-hop'>
              <p className='text-neutral-400 text-sm'>Hip-Hop</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/trap'>
              <p className='text-neutral-400 text-sm'>Trap</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/r&b'>
              <p className='text-neutral-400 text-sm'>R&B</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/reggaeton'>
              <p className='text-neutral-400 text-sm'>Reggaeton</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/afrobeat'>
              <p className='text-neutral-400 text-sm'>Afrobeat</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/rock'>
              <p className='text-neutral-400 text-sm'>Rock</p>
            </Link>
          </li>
          <li>
            <Link href='/electronic'>
              <p className='text-neutral-400 text-sm'>Electronic</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex-1 p-4 pl-5'>
        <h4 className='text-neutral-500 text-xs mb-3'>INSTRUMENTS</h4>
        <ul className='list-none p-0 m-0'>
          <li className='mb-3'>
            <Link href='/drums'>
              <p className='text-neutral-400 text-sm'>Drums</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/guitars'>
              <p className='text-neutral-400 text-sm'>Guitars</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/bass'>
              <p className='text-neutral-400 text-sm'>Bass</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/vocals'>
              <p className='text-neutral-400 text-sm'>Vocals</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/synth'>
              <p className='text-neutral-400 text-sm'>Synth</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/piano'>
              <p className='text-neutral-400 text-sm'>Piano</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/keyboard'>
              <p className='text-neutral-400 text-sm'>Keyboard</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/percussion'>
              <p className='text-neutral-400 text-sm'>Percussion</p>
            </Link>
          </li>
          <li className='mb-3'>
            <Link href='/strings'>
              <p className='text-neutral-400 text-sm'>Strings</p>
            </Link>
          </li>
          <li>
            <Link href='/brass'>
              <p className='text-neutral-400 text-sm'>Brass</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faGem,
  faMoneyBill,
  faWater,
  faLeaf,
  faPaw,
  faBurst,
  faBoltLightning,
} from '@fortawesome/free-solid-svg-icons';

interface GenreFilterProps {
  onApplyGenreFilter: (selectedGenres: string[]) => void;
}

const genreItems = [
  { icon: faStar, text: 'Pop' },
  { icon: faGem, text: 'Hiphop' },
  { icon: faMoneyBill, text: 'Trap' },
  { icon: faWater, text: 'R&B' },
  { icon: faLeaf, text: 'Reggaeton' },
  { icon: faPaw, text: 'Afrobeat' },
  { icon: faBurst, text: 'Rock' },
  { icon: faBoltLightning, text: 'Electronic' },
];

const GenreFilter: React.FC<GenreFilterProps> = ({ onApplyGenreFilter }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleApplyFilterClick = () => {
    onApplyGenreFilter(selectedGenres);
  };

  const handleClearClick = () => {
    setSelectedGenres([]);
  };

  return (
    <div className='flex flex-col top-12 absolute bg-neutral-800 border border-neutral-700 py-4 px-2 shadow rounded-lg text-neutral-300 text-xs'>
      <div className='grid grid-cols-4 gap-2'>
        {genreItems.map((item, index) => (
          <button
            key={index}
            className={`mb-0 hover:text-neutral-200 hover:bg-neutral-600 rounded-lg flex flex-row px-1.5 py-1.5 ${
              selectedGenres.includes(item.text)
                ? 'bg-indigo-600 text-white'
                : 'bg-neutral-800 text-neutral-300'
            }`}
            onClick={() => handleGenreToggle(item.text)}
          >
            <div className='flex items-center justify-center w-4'>
              <FontAwesomeIcon
                icon={item.icon}
                className='justify-center items-center mt-0.5'
              />
            </div>
            <p className='ml-1'>{item.text}</p>
          </button>
        ))}
      </div>
      <div className='flex justify-end mt-4'>
        <button
          onClick={handleClearClick}
          className='text-sm rounded-full mr-3 text-white bg-neutral-600 px-6 py-1'
        >
          Clear
        </button>
        <button
          onClick={handleApplyFilterClick}
          className='text-sm rounded-full text-white bg-indigo-700 px-5 py-2'
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default GenreFilter;

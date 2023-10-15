import React, { useState, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styled, { css, keyframes } from 'styled-components';

interface StyledSearchBarProps {
  isFocused: boolean;
  isAnimating: boolean;
}

const expand = keyframes`
  0% {
    width: 12.5rem;
  }
  30% {
    width: 25rem;
  }
  70% {
    width: 22.5rem;
  }
`;

const StyledSearchBar = styled.div<StyledSearchBarProps>`
  transition: all 0.5s ease-in-out;
  width: ${props => (props.isFocused ? '22.5rem' : '12.5rem')};

  ${props =>
    props.isAnimating &&
    css`
      animation: ${expand} 0.4s ease-in-out forwards;
    `}
`;

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Genre'); // Track selected menu
  const dropdownRef = useRef(null);

  const handleFocus = () => {
    if (!isFocused) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 400);
    }
    setIsFocused(true);
  };

  const clearInput = () => {
    setInputValue('');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenu(menuItem); // Update selected menu
    setIsDropdownOpen(false); // Close the dropdown
  };

  return (
    <StyledSearchBar
      className={`relative group rounded-2xl py-2 ${
        isAnimating ? 'animating' : ''
      }`}
      isFocused={isFocused}
      isAnimating={isAnimating}
    >
      <input
        type='text'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onFocus={handleFocus}
        className={`searchInput focus:outline-none w-full h-8 pl-4 pr-8 text-sm rounded-2xl text-neutral-200 bg-transparent border-neutral-600 hover:border-neutral-400 z-10 focus:border-indigo-500`}
        placeholder='Search...'
      />
      <div className='absolute inset-y-0 right-0 flex items-center pl-2 cursor-pointer'>
        {inputValue && (
          <FontAwesomeIcon
            icon={faTimes}
            size='xs'
            className='text-neutral-800 bg-neutral-400 rounded-full px-1 py-0.5 mr-2 cursor-pointer'
            onClick={clearInput}
          />
        )}
        {isFocused && (
          <div
            className='flex items-center border-l border-neutral-600 px-4 dropdown-trigger'
            onClick={toggleDropdown}
          >
            <span className='text-neutral-400 text-sm mr-1.5'>
              {selectedMenu}
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              size='2xs'
              className='text-neutral-400 -mt-0.5'
            />
          </div>
        )}

        {/* Dropdown content */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className='absolute top-12 left-4 bg-neutral-800 rounded-2xl w-36'
          >
            <ul className='p-4'>
              <li className='mb-3'>
                <button
                  className={`text-sm ${
                    selectedMenu === 'Genre'
                      ? 'text-indigo-600'
                      : 'text-neutral-400'
                  } hover:text-indigo-600`}
                  onClick={() => handleMenuItemClick('Genre')}
                >
                  Genre
                </button>
              </li>
              <li className='mb-3'>
                <button
                  className={`text-sm ${
                    selectedMenu === 'Instruments'
                      ? 'text-indigo-600'
                      : 'text-neutral-400'
                  } hover:text-indigo-600`}
                  onClick={() => handleMenuItemClick('Instruments')}
                >
                  Instruments
                </button>
              </li>
              <li className='mb-3'>
                <button
                  className={`text-sm ${
                    selectedMenu === 'Artist'
                      ? 'text-indigo-600'
                      : 'text-neutral-400'
                  } hover:text-indigo-600`}
                  onClick={() => handleMenuItemClick('Artist')}
                >
                  Artist
                </button>
              </li>
              <li className='mb-3'>
                <button
                  className={`text-sm ${
                    selectedMenu === 'Mood'
                      ? 'text-indigo-600'
                      : 'text-neutral-400'
                  } hover:text-indigo-600`}
                  onClick={() => handleMenuItemClick('Mood')}
                >
                  Mood
                </button>
              </li>
              <li className='mb-3'>
                <button
                  className={`text-sm ${
                    selectedMenu === 'Key'
                      ? 'text-indigo-600'
                      : 'text-neutral-400'
                  } hover:text-indigo-600`}
                  onClick={() => handleMenuItemClick('Key')}
                >
                  Key
                </button>
              </li>
              <li>
                <button
                  className={`text-sm ${
                    selectedMenu === 'BPM'
                      ? 'text-indigo-600'
                      : 'text-neutral-400'
                  } hover:text-indigo-600`}
                  onClick={() => handleMenuItemClick('BPM')}
                >
                  BPM
                </button>
              </li>
            </ul>
          </div>
        )}

        <div
          className={
            isFocused
              ? 'bg-indigo-600 p-2 rounded-br-2xl rounded-tr-2xl'
              : 'p-2'
          }
        >
          <AiOutlineSearch
            width={16}
            height={16}
            className={`group-hover:text-neutral-200 search-icon ${
              isFocused ? 'text-neutral-200' : 'text-neutral-400'
            }`}
          />
        </div>
      </div>
    </StyledSearchBar>
  );
};

export default SearchBar;

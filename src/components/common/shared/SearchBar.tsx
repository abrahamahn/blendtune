import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Genre');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const styledSearchBarRef = useRef<HTMLDivElement | null>(null);

  const handleFocus = () => {
    setIsFocused(true);
    console.log('Input focused');
  };

  useEffect(() => {
    if (!isFocused) {
      setIsDropdownOpen(false);
    }

    const handleClick = (e: MouseEvent) => {
      if (isDropdownOpen) {
        if (
          dropdownRef.current &&
          dropdownRef.current.contains(e.target as Node)
        ) {
          return;
        }
      } else {
        if (
          styledSearchBarRef.current &&
          styledSearchBarRef.current.contains(e.target as Node)
        ) {
          return;
        }
      }

      setIsFocused(false);
      setIsDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isFocused, isDropdownOpen]);

  const animationStyles = {
    transition: 'all 0.5s ease-in-out',
    width: isFocused ? '22.5rem' : '12.5rem',
    border: `1px solid ${isFocused ? '#4F46E5' : '#6a7280'}`,
    animation: isFocused
      ? 'expand 0.4s ease-in-out forwards'
      : 'shrink 0.4s ease-in-out forwards',
  };

  const clearInput = () => {
    setInputValue('');
    console.log('Input cleared');
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (dropdownRef.current && dropdownRef.current.contains(e.target as Node)) {
      return;
    }
    setIsDropdownOpen(!isDropdownOpen);
    setIsFocused(true);
    console.log('Dropdown toggled');
  };

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenu(menuItem);
    setIsDropdownOpen(false);
    console.log(`Selected menu item: ${menuItem}`);
  };

  const menuItems = ['Genre', 'Instruments', 'Artist', 'Mood', 'Key', 'BPM'];

  return (
    <div
      className={`relative group rounded-2xl ${isFocused ? 'animating' : ''}`}
      style={animationStyles}
      onClick={handleFocus}
      ref={styledSearchBarRef}
    >
      <input
        type='text'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className={`focus:outline-none w-full h-8 pl-4 pr-8 text-sm rounded-2xl text-neutral-200 bg-transparent z-10`}
        placeholder='Search...'
        style={{
          outline: 'none',
          boxShadow: isFocused ? '0 0 0 2px #4F46E5' : 'none', // Add this style for focus
        }}
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
            className='flex items-center border-l border-neutral-600 px-3 dropdown-trigger'
            onClick={toggleDropdown}
          >
            <span className='text-neutral-400 text-sm mr-2'>
              {selectedMenu}
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              size='2xs'
              className={`text-neutral-400 ${
                isDropdownOpen ? 'rotate-180-animation' : ''
              }`}
            />
          </div>
        )}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className='absolute top-10 left-2 bg-neutral-800 rounded-xl w-32'
          >
            <ul className='p-3'>
              {menuItems.map(menuItem => (
                <li
                  className='mb-0.5 text-sm hover:bg-neutral-500 rounded-md text-neutral-400 hover:text-neutral-200'
                  key={menuItem}
                  onClick={() => handleMenuItemClick(menuItem)}
                >
                  <button className='text-sm p-1'>{menuItem}</button>
                </li>
              ))}
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
            className={`mr-1 search-icon ${
              isFocused ? 'text-neutral-200' : 'text-neutral-400'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

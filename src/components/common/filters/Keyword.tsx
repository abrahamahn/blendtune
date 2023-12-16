import React, { useState } from 'react';

interface KeywordFilterProps {
  keywords: string[];
}

const KeywordFilter: React.FC<KeywordFilterProps> = ({ keywords }) => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeywordToggle = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleClearClick = () => {
    setSelectedKeywords([]);
  };

  const handleApplyFilterClick = () => {
    console.log('Selected keywords:', selectedKeywords);
  };

  const filteredAndSortedKeywords = keywords
    .filter((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort();

  return (
    <div className='flex flex-col top-12 absolute bg-neutral-800 border border-neutral-700 py-4 px-2 shadow rounded-lg text-neutral-300 text-xs'>
      <div className='w-full flex flex-row mb-4'>
        <input
          type="text"
          placeholder="Search Keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-2/3 text-sm h-9 rounded-lg bg-neutral-800 border border-neutral-500 text-neutral-500 mr-4 placeholder-style'
        />
        <div className='w-1/3'>
          <button
            onClick={handleApplyFilterClick}
            className='text-sm rounded-full text-white bg-indigo-700 mr-2 px-4 py-2'
          >
            Apply
          </button>
          <button
            onClick={handleClearClick}
            className='text-sm rounded-full mr-3 text-white bg-neutral-600 px-4 py-2'
          >
            Clear
          </button>
        </div>
      </div>
      <div className='w-[500px] h-72 border rounded-md border-neutral-500 grid grid-cols-4 gap-0 overflow-y-auto max-h-72'>
        {filteredAndSortedKeywords.map((keyword, index) => (
          <button
            key={index}
            className={`mb-0 hover:text-neutral-200 hover:bg-neutral-600 rounded-lg flex flex-row px-1.5 py-1.5 ${
              selectedKeywords.includes(keyword)
                ? 'bg-indigo-600 text-white'
                : 'bg-neutral-800 text-neutral-300'
            }`}
            onClick={() => handleKeywordToggle(keyword)}
          >
            <p className='ml-1'>{keyword}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeywordFilter;

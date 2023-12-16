import React, { useState } from 'react';

interface MoodFilterProps {
  moods: string[];
  onApplyMoodFilter: (mood: string[]) => void;
  selectedMoods: string[];
  setSelectedMoods: (mood: string[]) => void;
}

const MoodFilter: React.FC<MoodFilterProps> = ({ 
  onApplyMoodFilter, 
  moods, 
  selectedMoods, 
  setSelectedMoods 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleMoodToggle = (mood: string) => {
  if (selectedMoods.includes(mood)) {
    setSelectedMoods(selectedMoods.filter((m) => m !== mood));
  } else {
    setSelectedMoods([...selectedMoods, mood]);
  }
};

  const handleClearClick = () => {
    setSelectedMoods([]);
  };

  const handleApplyFilterClick = () => {
    onApplyMoodFilter(selectedMoods);
  };

  const filteredAndSortedMoods = moods
  .filter((mood) => mood.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort();

  return (
    <div className='flex flex-col top-12 absolute bg-neutral-800 border border-neutral-700 py-4 px-2 shadow rounded-lg text-neutral-300 text-xs'>
      <div className='w-full flex flex-row mb-4'>
        <input
          type="text"
          placeholder="Search Moods..."
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
        {filteredAndSortedMoods.map((mood, index) => (
          <button
            key={index}
            className={`items-center hover:text-neutral-200 hover:bg-neutral-600 rounded-lg flex flex-row px-1.5 ${
              selectedMoods.includes(mood)
                ? 'bg-indigo-600 text-white'
                : 'bg-neutral-800 text-neutral-300'
            }`}
            onClick={() => handleMoodToggle(mood)}
          >
            <p className='ml-1'>{mood}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodFilter;

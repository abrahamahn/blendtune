import React, { useState } from 'react';

interface TempoFilterProps {}

const TempoFilter: React.FC<TempoFilterProps> = () => {
  // State to manage min and max values
  const [minTempo, setMinTempo] = useState(0);
  const [maxTempo, setMaxTempo] = useState(200);
  const [includeHalfTime, setIncludeHalfTime] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setIncludeHalfTime(!includeHalfTime);
  };

  // Handle Clear button click
  const handleClearClick = () => {
    setMinTempo(0);
    setMaxTempo(200);
    setIncludeHalfTime(false);
  };

  // Handle Apply Filter button click (You can define your logic here)
  const handleApplyFilterClick = () => {
    // Implement your filter logic here
    console.log('Applying filter...');
  };

  return (
    <div className='absolute top-14 bg-neutral-800 border border-neutral-700 py-4 px-8 shadow rounded-lg text-neutral-300 text-xs'>
      {/* First Row */}
      <div className='w-full flex items-center'>
        <div className='range-slider'>
          <input
            type='range'
            min={0}
            max={200}
            value={minTempo}
            onChange={e => setMinTempo(parseInt(e.target.value))}
          />
        </div>
      </div>
      {/* Second Row */}
      <div className='flex flex-row mt-4'>
        <div className='flex flex-col w-24'>
          <label htmlFor='minTempo' className='text-neutral-400'>
            From
          </label>
          <input
            type='text'
            id='minTempo'
            placeholder='From'
            value={minTempo}
            onChange={e => setMinTempo(parseInt(e.target.value))}
            className='text-white rounded-md border border-neutral-500 bg-neutral-600 text-sm h-8 mt-1'
          />
        </div>
        <div className='border-t border-neutral-500 mt-9 w-8 mx-4'></div>
        <div className='flex flex-col w-24'>
          <label htmlFor='maxTempo' className='text-neutral-400'>
            To
          </label>
          <input
            type='text'
            id='maxTempo'
            placeholder='To'
            value={maxTempo}
            onChange={e => setMaxTempo(parseInt(e.target.value))}
            className='text-white rounded-md border border-neutral-500 bg-neutral-600 text-sm h-8 mt-1'
          />
        </div>
      </div>
      {/* Third Row */}
      <div className='flex items-center mt-4'>
        <input
          type='checkbox'
          checked={includeHalfTime}
          onChange={handleCheckboxChange}
          className='bg-neutral-800 rounded-md border-2 border-neutral-500 w-5 h-5'
        />
        <span className='ml-2.5'>Include half time</span>
      </div>
      {/* Fourth Row */}
      <div className='border-t border-neutral-600 mt-4'></div>
      {/* Fifth Row */}
      <div className='flex justify-end mt-6'>
        <button
          onClick={handleClearClick}
          className='text-sm rounded-full mr-3 text-white bg-neutral-600 px-6 py-2.5'
        >
          Clear
        </button>
        <button
          onClick={handleApplyFilterClick}
          className='text-sm rounded-full text-white bg-indigo-700 px-5 py-2.5'
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default TempoFilter;

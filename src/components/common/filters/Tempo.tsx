import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface TempoFilterProps {
  onApplyTempoFilter: (minTempo: number, maxTempo: number, includeHalfTime: boolean, includeDoubleTime: boolean) => void;
}

const TempoFilter: React.FC<TempoFilterProps> = ({ onApplyTempoFilter }) => {
  const [isFilterActive, setIsFilterActive] = useState(false);

  const [minTempo, setMinTempo] = useState(0);
  const [maxTempo, setMaxTempo] = useState(200);
  const [includeHalfTime, setIncludeHalfTime] = useState(false);
  const [includeDoubleTime, setIncludeDoubleTime] = useState(false);

  const handleHalfTimeCheckboxChange = () => {
    setIncludeHalfTime(!includeHalfTime);
  };

  const handleDoubleTimeCheckboxChange = () => {
    setIncludeDoubleTime(!includeDoubleTime);
  };

  const clearFilter = () => {
    setMinTempo(0);
    setMaxTempo(200);
    setIncludeHalfTime(false);
    setIncludeDoubleTime(false);
    setIsFilterActive(false); // Deactivate the filter
  };

  const handleClearClick = () => {
    clearFilter();
  };

  const handleApplyFilterClick = () => {
    onApplyTempoFilter(minTempo, maxTempo, includeHalfTime, includeDoubleTime);
  };

  const handleSliderChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      const [minValue, maxValue] = values;

      // Ensure the minimum value is less than or equal to the maximum value
      if (minValue > maxValue) {
        // Swap the values if necessary
        setMinTempo(maxValue);
        setMaxTempo(minValue);
      } else {
        // Values are in the correct order, set them as-is
        setMinTempo(minValue);
        setMaxTempo(maxValue);
      }
    } else {
      // Handle the case when a single value is received (not a range)
      setMinTempo(values);
      setMaxTempo(values);
    }
  };

  return (
    <div className='absolute top-12 bg-neutral-800 border border-neutral-700 py-4 px-8 shadow rounded-lg text-neutral-300 text-xs'>
      <Slider
        min={40}
        max={200}
        range
        value={[minTempo, maxTempo]}
        onChange={handleSliderChange}
        className="w-full mt-4"
        handleStyle={[
          {
            backgroundColor: "#4338CA",
            borderColor: "#5148c9",
            opacity: 1,
            borderWidth: 1,
          },
          {
            backgroundColor: "#4338CA", 
            borderColor: "#5148c9",
            opacity: 1,
            borderWidth: 1,
          },
        ]}
        trackStyle={[{ backgroundColor: "#5148c9" }]}
        railStyle={{ backgroundColor: "#737373" }}
        activeDotStyle={{ borderColor: 'yellow' }}
      />
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
      <div className='flex flex-col items-start mt-4'>
        <div className='flex flex-row mb-2'>
          <input
            type='checkbox'
            checked={includeHalfTime}
            onChange={handleHalfTimeCheckboxChange}
            className='checked:bg-indigo-600 active:outline-none focus:outline-none checked:border-indigo-500 hover:bg-neutral-700 bg-neutral-800 rounded-md border-2 border-neutral-500 w-5 h-5'
          />
          <span className='ml-2.5'>Include half time</span>
        </div>
        <div>
          <input
            type='checkbox'
            checked={includeDoubleTime}
            onChange={handleDoubleTimeCheckboxChange}
            className='checked:bg-indigo-600 active:outline-none focus:outline-none checked:border-indigo-500 hover:bg-neutral-700 bg-neutral-800 rounded-md border-2 border-neutral-500 w-5 h-5'
          />
          <span className='ml-2.5'>Include double time</span>
        </div>

      </div>
      <div className='border-t border-neutral-600 mt-4'></div>
      <div className='flex justify-end mt-6'>
        <button
          onClick={handleClearClick}
          className={`text-sm rounded-full mr-3 text-white ${
            isFilterActive ? 'bg-indigo-700' : 'bg-neutral-600'
          } px-6 py-2.5`}
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

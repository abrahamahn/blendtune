import React from 'react';

interface InstrumentFilterProps {
  props: string;
}

const InstrumentFilter: React.FC<InstrumentFilterProps> = ({ props }) => {
  return (
    <div className='absolute bg-white p-4 shadow rounded-lg'>
      <h2 className='text-lg font-semibold mb-2'>Artist Filter</h2>
      <ul>
        <li className='mb-2'>
          <label className='block'>Filter Option 1</label>
          <input type='checkbox' />
        </li>
        <li className='mb-2'>
          <label className='block'>Filter Option 2</label>
          <input type='checkbox' />
        </li>
        <li className='mb-2'>
          <label className='block'>Filter Option 3</label>
          <input type='checkbox' />
        </li>
      </ul>
    </div>
  );
};

export default InstrumentFilter;
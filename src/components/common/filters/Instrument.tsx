import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrum, faGuitar, faBarsStaggered, faMicrophoneLines, faWaveSquare, faMemory, faDrumSteelpan, faLinesLeaning } from '@fortawesome/free-solid-svg-icons';

interface InstrumentFilterProps {
  onApplyInstrumentsFilter: (selectedInstruments: string[]) => void;
  selectedInstruments: string[];
  setSelectedInstruments: (selectedInstruments: string[]) => void;
}


const instrumentItems = [
  { icon: faDrum, text: 'Drums' },
  { icon: faGuitar, text: 'Guitars' },
  { icon: faBarsStaggered, text: 'Bass' },
  { icon: faMicrophoneLines, text: 'Vocals' },
  { icon: faWaveSquare, text: 'Synth' },
  { icon: faMemory, text: 'Keyboard' },
  { icon: faDrumSteelpan, text: 'Percussion' },
  { icon: faLinesLeaning, text: 'Strings' },
];

const InstrumentFilter: React.FC<InstrumentFilterProps> = ({
  onApplyInstrumentsFilter, 
  selectedInstruments, 
  setSelectedInstruments
}) => {

  const handleInstrumentToggle = (instrument: string) => {
    if (selectedInstruments.includes(instrument)) {
      setSelectedInstruments(selectedInstruments.filter((i) => i !== instrument));
    } else {
      setSelectedInstruments([...selectedInstruments, instrument]);
    }
  };

  const handleClearClick = () => {
    setSelectedInstruments([]);
  };

  const handleApplyFilterClick = () => {
    onApplyInstrumentsFilter(selectedInstruments);
  };

  return (
    <div className='flex flex-col top-12 absolute bg-neutral-800 border border-neutral-700 py-4 px-2 shadow rounded-lg text-neutral-300 text-xs'>
      <div className='grid grid-cols-4 gap-2'>
        {instrumentItems.map((item, index) => (
          <button
            key={index}
            className={`mb-0 hover:text-neutral-200 hover:bg-neutral-600 rounded-lg flex flex-row px-1.5 py-1.5 ${
              selectedInstruments.includes(item.text)
                ? 'bg-indigo-600 text-white'
                : 'bg-neutral-800 text-neutral-300'
            }`}
            onClick={() => handleInstrumentToggle(item.text)}
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

export default InstrumentFilter;

import React, { useState } from 'react';

interface KeyFilterProps {
  onApplyKeyFilter: (key: string | null, scale: string | null, includeRelative: boolean) => void;
}
const KeyFilter: React.FC<KeyFilterProps> = ({ onApplyKeyFilter }) => {
  console.log('Rendering KeyFilter component');

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedAccidental, setSelectedAccidental] = useState<string>('Flat');
  const [selectedScale, setSelectedScale] = useState<string>('Major');
  const [includeRelativeScale, setIncludeRelativeScale] = useState(false);

  const handleKeyChange = (key: string) => {
      console.log('Key changed to:', key);

    setSelectedKey((prevKey) => (prevKey === key ? null : key));
  };

  const handleAccidentalChange = (accidental: string) => {
      console.log('Accidental changed to:', accidental);

    if (selectedAccidental === accidental) {
      return;
    }
    setSelectedAccidental(accidental);
  };

  const handleScaleChange = (scale: string) => {
      console.log('Scale changed to:', scale);

    setSelectedScale(scale);
  };

 const handleIncludeRelativeScaleChange = () => {
    console.log('Include Relative Scale changed');

    setIncludeRelativeScale((prevIncludeRelativeScale) => !prevIncludeRelativeScale);
  };
  const getSelectedBlackKeys = () => {
    return selectedAccidental === 'Flat' ? blackFlatKeys : blackSharpKeys;
  };

  const blackSharpKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];
  const blackFlatKeys = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const scales = ['Major', 'Minor'];
  const accidentals = ['Flat', 'Sharp'];

  const selectedBlackKeysArray = getSelectedBlackKeys();
  const firstTwoBlackKeys = selectedBlackKeysArray.slice(0, 2);
  const lastThreeBlackKeys = selectedBlackKeysArray.slice(2);

  const generateKeyCombinations = () => {
    const uniqueCombinations = new Set<string>();

    if (selectedKey) {
      addKeyAndRelativeScale(selectedKey, uniqueCombinations);

      const equivalentKey =
        selectedAccidental === 'Flat'
          ? getSharpEquivalent(selectedKey)
          : getFlatEquivalent(selectedKey);
      if (equivalentKey !== selectedKey) {
        addKeyAndRelativeScale(equivalentKey, uniqueCombinations);
      }
    }

    console.log(
      'Generated Key Combinations:',
      Array.from(uniqueCombinations)
    ); // Log generated combinations

    return Array.from(uniqueCombinations);
  };

  const addKeyAndRelativeScale = (key: string, combinations: Set<string>) => {
    if (selectedScale === 'Major') {
        const majorKey = key + ' Major';
        combinations.add(JSON.stringify({ key: majorKey, 'key.note': key, 'key.scale': 'Major' }));
    }

    if (selectedScale === 'Minor') {
        const minorKey = key + ' Minor';
        combinations.add(JSON.stringify({ key: minorKey, 'key.note': key, 'key.scale': 'Minor' }));
    }

    if (includeRelativeScale) {
        const relativeMinor = getRelativeMinor(key) + ' Minor';
        combinations.add(JSON.stringify({ key: relativeMinor, 'key.note': getRelativeMinor(key), 'key.scale': 'Minor' }));

        if (key === 'E' || key === 'A' || key === 'B') {
            const enharmonicMinor = getEnharmonicMinor(key) + ' Minor';
            combinations.add(JSON.stringify({ key: enharmonicMinor, 'key.note': getEnharmonicMinor(key), 'key.scale': 'Minor' }));
        }
    }
};


  const getRelativeMinor = (majorKey: string) => {
    const majorToMinorMap: { [key: string]: string } = {
      'C': 'A', 'C#': 'A#', 'D': 'B', 'D#': 'C',
      'E': 'C#', 'F': 'D', 'F#': 'D#', 'G': 'E',
      'G#': 'F', 'A': 'F#', 'A#': 'G', 'B': 'G#',
      'Db': 'Bb', 'Eb': 'C', 'Gb': 'Eb', 'Ab': 'F', 'Bb': 'G',
    };

    // Handle enharmonic equivalents
    if (majorKey === 'C#') {
      majorToMinorMap['Db'] = 'Bb';
    } else if (majorKey === 'F#') {
      majorToMinorMap['Gb'] = 'Eb';
    } else if (majorKey === 'G#') {
      majorToMinorMap['Ab'] = 'F';
    }

    return majorToMinorMap[majorKey] || 'A';
  };

  const getEnharmonicMinor = (majorKey: string) => {
    const enharmonicMap: { [key: string]: string } = {
      'E': 'Db',
      'A': 'Gb',
      'B': 'Ab'
    };
      
    return enharmonicMap[majorKey] || majorKey;
  };

  const getSharpEquivalent = (flatKey: string) => {
    const flatToSharpMap: { [key: string]: string } = { 'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#' };
    return flatToSharpMap[flatKey] || flatKey;
  };

  const getFlatEquivalent = (sharpKey: string) => {
    const sharpToFlatMap: { [key: string]: string } = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb' };
    return sharpToFlatMap[sharpKey] || sharpKey;
  };

  const handleApplyFilter = () => {
    console.log('Applying Filter');

    const keyCombinations = generateKeyCombinations();
    const keyCombinationsArray = Array.from(keyCombinations);

    console.log('Key Combinations:', keyCombinationsArray);

    onApplyKeyFilter(selectedKey, selectedScale, includeRelativeScale);
  };

  return (
    <div className='absolute top-12 bg-neutral-800 border border-neutral-700 py-4 px-8 shadow rounded-lg text-neutral-300 text-xs'>
      <div className='flex items-center mb-4 justify-center bg-neutral-700 rounded-md p-1 w-full'>
        {accidentals.map((accidental: string) => (
          <div className='flex-1 w-full text-center' key={accidental}>
            <button
              onClick={() => handleAccidentalChange(accidental)}
              className={`w-full ${
                selectedAccidental === accidental ? 'bg-indigo-600 animate-fadeIn' : ''
              } text-neutral-300 py-1 rounded-lg focus:outline-none`}
            >
              {accidental}
            </button>
          </div>
        ))}
      </div>
      <div className='flex items-center mb-6 justify-center bg-neutral-700 rounded-md p-1 w-full'>
        {scales.map((scale: string) => (
          <div className='flex-1 w-full text-center' key={scale}>
            <button
              onClick={() => handleScaleChange(scale)}
              className={`w-full ${
                selectedScale === scale ? 'bg-indigo-600 animate-fadeIn' : ''
              } text-neutral-300 py-1 rounded-lg focus:outline-none`}
            >
              {scale}
            </button>
          </div>
        ))}
      </div>
      <div className='flex items-center mb-2'>
        <div className='flex-1 ml-5'>
          {firstTwoBlackKeys.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyChange(key)}
              className={`w-8 h-10 rounded-md mx-1 focus:outline-none ${
                selectedKey === key ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-700 text-neutral-300'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        <div className='flex-1 mr-5'>
          {lastThreeBlackKeys.map((key: string) => (
            <button
              key={key}
              onClick={() => handleKeyChange(key)}
              className={`text-neutral-300 w-8 h-10 rounded-md mx-1 focus:outline-none ${
                selectedKey === key ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-700 text-neutral-300'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
      <div className='flex items-center mb-8'>
        {whiteKeys.map((key: string) => (
          <button
            key={key}
            onClick={() => handleKeyChange(key)}
            className={`w-8 h-10 rounded-md mx-1 focus:outline-none ${
              selectedKey === key ? 'bg-neutral-100 text-neutral-800' : 'bg-neutral-700 text-neutral-300'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className='flex items-center'>
        <input
          type='checkbox'
          checked={includeRelativeScale}
          onChange={handleIncludeRelativeScaleChange}
          className='checked:bg-indigo-600 active:outline-none focus:outline-none checked:border-indigo-500 hover:bg-neutral-700 bg-neutral-800 rounded-md border-2 border-neutral-500 w-5 h-5'
        />
        <span className='ml-2.5'>Include relative scale</span>
      </div>
      <div className='border-t border-neutral-600 mt-4'></div>
      <div className='flex justify-end mt-6'>
        <button
          onClick={() => {
            setSelectedKey(null);
            setSelectedScale('');
            setIncludeRelativeScale(false);
          }}
          className='text-sm rounded-full mr-3 text-white bg-neutral-600 px-6 py-2.5'
        >
          Clear
        </button>
        <button
          onClick={handleApplyFilter}
          className='text-sm rounded-full text-white bg-indigo-700 px-5 py-2.5'
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default KeyFilter;

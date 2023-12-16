import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Track } from '@/types/track';
import {
  ArtistFilter,
  GenreFilter,
  InstrumentFilter,
  KeyFilter,
  KeywordFilter,
  MoodFilter,
  TempoFilter,
} from '@/components/common/filters';

import {
  faFilter,
  faChevronDown,
  faChevronUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

interface SoundFilterProps {
  tracks: Track[];
  applyTempoFilter: (minTempo: number, maxTempo: number, includeHalfTime: boolean, includeDoubleTime: boolean) => void;
  applyKeyFilter: (key: string | null, scale: string | null, includeRelative: boolean) => void;
  applyGenreFilter: (selectedGenres: string[]) => void;

  applyArtistFilter: (selectedArtists: string[]) => void;
  selectedArtists: string[];
  setSelectedArtists: (selectedArtists: string[]) => void; //

  applyInstrumentsFilter: (selectedInstruments: string[]) => void;
  selectedInstruments: string[];
  setSelectedInstruments: (selectedInstruments: string[]) => void;

  applyMoodFilter: (selectedMoods: string[]) => void;
}
const SoundFilter: React.FC<SoundFilterProps> = ({
  tracks, 
  applyTempoFilter,
  applyKeyFilter,
  applyGenreFilter,

  applyArtistFilter,
  selectedArtists,
  setSelectedArtists,

  applyInstrumentsFilter,
  selectedInstruments,
  setSelectedInstruments,

  applyMoodFilter,
}) => {
  console.log('Current tracks:', tracks);
  
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [uniqueArtists, setUniqueArtists] = useState<string[]>([]);
  const [uniqueMoods, setUniqueMoods] = useState<string[]>([]);
  const [uniqueKeywords, setUniqueKeywords] = useState<string[]>([]);

  const toggleFilter = (filterName: string) => {
    if (openFilter === filterName) {
      console.log('Closing filter:', filterName);
      setOpenFilter(null);
    } else {
      console.log('Opening filter:', filterName);
      setOpenFilter(filterName);
    }
  };

  useEffect(() => {
    const extractUniqueArtists = () => {
      const artistSet = new Set<string>();
      tracks.forEach((track) => {
        track.info?.relatedartist?.forEach((combinedArtists) => {
          combinedArtists.split(',').forEach((artist) => {
            artistSet.add(artist.trim()); // This should handle duplicates
          });
        });
      });

      const uniqueArtistsArray = Array.from(artistSet).sort();
      console.log('Unique artists:', uniqueArtistsArray);
      setUniqueArtists(uniqueArtistsArray);
    };

    extractUniqueArtists();
  }, [tracks]);

  useEffect(() => {
    const extractUniqueMoods = () => {
      const moodSet = new Set<string>();
      tracks.forEach((track) => {
        track.info?.mood?.forEach((mood) => {
          moodSet.add(mood); // This should handle duplicates
        });
      });

      const uniqueMoodsArray = Array.from(moodSet).sort();
      console.log('Unique moods:', uniqueMoodsArray);
      setUniqueMoods(uniqueMoodsArray);
    };

    extractUniqueMoods();
  }, [tracks]);

  useEffect(() => {
    const extractKeywords = () => {
      const keywordSet = new Set<string>();

      // Adding unique artists and moods
      tracks.forEach((track) => {
        track.info?.relatedartist?.forEach(artist => artist.split(',').forEach(a => keywordSet.add(a.trim())));
        track.info?.mood?.forEach(mood => keywordSet.add(mood));
        
        // Adding other fields
        if (track.metadata?.producer) keywordSet.add(track.metadata.producer);
        if (track.metadata?.title) keywordSet.add(track.metadata.title);
        track.info?.genre?.forEach(genre => {
          if (genre.maingenre) keywordSet.add(genre.maingenre);
          if (genre.subgenre) keywordSet.add(genre.subgenre);
        });
        track.instruments?.forEach(instrument => {
          if (instrument.main) keywordSet.add(instrument.main);
          if (instrument.sub) keywordSet.add(instrument.sub);
        });
      });

      const uniqueKeywordsArray = Array.from(keywordSet).sort();
      console.log('Unique keywords:', uniqueKeywordsArray);
      setUniqueKeywords(uniqueKeywordsArray);
    };

    extractKeywords();
  }, [tracks]);

  return (
    <div className='fixed mt-8 lg:mt-0 z-30 w-full py-1 lg:py-2 bg-neutral-50 dark:bg-black items-center border-b-0 border-neutral-100'>
      <div className='max-w-screen-xl mx-auto px-2 lg:px-6'>
        <div className='lg:flex-row lg:flex justify-between items-center w-full hidden'>
          <div className='flex flex-row'>
            {[
              { name: 'Tempo', 
                component: <TempoFilter onApplyTempoFilter={applyTempoFilter}/> 
              },
              { name: 'Key', 
                component: <KeyFilter onApplyKeyFilter={applyKeyFilter} /> 
              },
              { name: 'Genre', 
                component: <GenreFilter onApplyGenreFilter={applyGenreFilter }/> 
              },
              { 
                name: 'Artist', 
                component: <ArtistFilter artists={uniqueArtists} onApplyArtistFilter={applyArtistFilter} selectedArtists={selectedArtists} setSelectedArtists={setSelectedArtists}/> 
              },
              { 
                name: 'Instrument', 
                component: <InstrumentFilter onApplyInstrumentsFilter={applyInstrumentsFilter} selectedInstruments={selectedInstruments}
                setSelectedInstruments={setSelectedInstruments}/> 
              },
              { 
                name: 'Mood', 
                component: <MoodFilter moods={uniqueMoods} onApplyMoodFilter={applyMoodFilter}/> 
              },
              { 
                name: 'Keyword', 
                component: <KeywordFilter keywords={uniqueKeywords} /> 
              },
            ].map(({ name, component }) => (
              <div className='mr-2' key={name}>
                <button
                  className={`flex flex-row px-3 py-1.5 bg-transparent dark:bg-neutral-800 text-neutral-500 dark:text-neutral-300 border rounded-lg ${
                    openFilter === name
                      ? 'border-indigo-500'
                      : 'border-neutral-400 hover:border-neutral-300 dark:border-neutral-600 dark:hover:border-neutral-500'
                  }`}
                  onClick={() => toggleFilter(name)}
                >
                  <p className='text-2xs mr-1.5'>{name}</p>
                  {name === 'Keyword' && (
                    <FontAwesomeIcon
                      icon={faPlus}
                      size='2xs'
                      className={`cursor-pointer mt-0.5 ${
                        openFilter === name ? 'chevron-up' : 'chevron-down'
                      }`}
                    />
                  )}
                  {name !== 'Keyword' && (
                    <FontAwesomeIcon
                      icon={openFilter === name ? faChevronUp : faChevronDown}
                      size='2xs'
                      className={`cursor-pointer mt-0.5 ${
                        openFilter === name ? 'chevron-up' : 'chevron-down'
                      }`}
                    />
                  )}
                </button>
                {openFilter === name && <div>{component}</div>}
              </div>
            ))}
          </div>
          <div className='flex'>
            <button className='flex flex-row py-1.5 px-4 mb-1 bg-transparent border rounded-full border-neutral-500 hover:border-neutral-400 dark:border-neutral-600 dark:hover:border-neutral-500 text-neutral-500 dark:text-neutral-300'>
              <p className='text-2xs mr-1.5'>Sort by: </p>
              <p className='text-semibold text-2xs mr-1.5'>Popular</p>
              <FontAwesomeIcon
                icon={faChevronDown}
                size='2xs'
                className='cursor-pointer mt-0.5'
              />
            </button>
          </div>
        </div>
        <div className='w-full sm:w-36 ml-auto p-1 block lg:hidden'>
          <button className='w-full text-sm p-1 font-semibold text-white bg-indigo-500 hover:bg-indigo-400 dark:bg-indigo-600 dark:hover:bg-violet-500 rounded-full'>
            <FontAwesomeIcon
              icon={faFilter}
              className='cursor-pointer mt-1 mr-2'
            />
            Filter & Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundFilter;

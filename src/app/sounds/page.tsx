'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  MobileCatalog,
  DesktopCatalog,
  MusicPlayer,
  SoundFilter,
  TrackInfo,
} from '@/components/pages/Sounds';
import { Track } from '@/types/track';

type CustomAudioRef = React.RefObject<HTMLAudioElement> & {
  volume: number;
};

const Sounds: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);

  const [currentTrack, setCurrentTrack] = useState<Track | null | undefined>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(false);
  const [isTrackInfoVisible, setIsTrackInfoVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null) as CustomAudioRef;

  useEffect(() => {
    fetch('/data/tracks.json')
      .then(response => response.json())
      .then((data: Track[]) => {
        const reversedTracks = [...data].reverse();
        setTracks(reversedTracks);
      })
      .catch(error => console.log(error));
  }, []);

  const playTrack = (track: Track) => {
    if (currentTrack === track && isPlaying === true) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else if (currentTrack === track && isPlaying === false) {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setIsMusicPlayerVisible(true);
    }
  };

  const handleBackwardClick = () => {
    const currentIndex = tracks.findIndex(
      track => track.id === currentTrack?.id
    );
    if (currentIndex > 0) {
      const previousTrack = tracks[currentIndex - 1];
      setCurrentTrack(previousTrack);
      setIsPlaying(true);
    }
  };

  const handleForwardClick = () => {
    const currentIndex = tracks.findIndex(
      track => track.id === currentTrack?.id
    );
    if (currentIndex < tracks.length - 1) {
      const nextTrack = tracks[currentIndex + 1];
      setCurrentTrack(nextTrack);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    setFilteredTracks(tracks);
  }, [tracks]);

  const applyTempoFilter = (
    minTempo: number | null,
    maxTempo: number | null,
    includeHalfTime: boolean,
    includeDoubleTime: boolean
  ) => {
    if (
      minTempo === null &&
      maxTempo === null &&
      !includeHalfTime &&
      !includeDoubleTime
    ) {
      setFilteredTracks(tracks);
    } else {
      const filtered = tracks.filter(track => {
        const trackTempo = parseFloat(track.info.bpm);
        if (isNaN(trackTempo)) {
          return false;
        }

        let isInHalfTimeRange = false;
        let isInDoubleTimeRange = false;

        if (includeHalfTime) {
          isInHalfTimeRange =
            trackTempo >= minTempo! / 2 && trackTempo <= maxTempo! / 2;
        }

        if (includeDoubleTime) {
          isInDoubleTimeRange =
            trackTempo >= minTempo! * 2 && trackTempo <= maxTempo! * 2;
        }

        const isInNormalRange =
          trackTempo >= minTempo! && trackTempo <= maxTempo!;

        return isInNormalRange || isInHalfTimeRange || isInDoubleTimeRange;
      });
      setFilteredTracks(filtered);
    }
  };

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedScale, setSelectedScale] = useState<string | null>(null);
  const [includeRelativeScales, setIncludeRelativeScales] =
    useState<boolean>(false);

  const applyKeyFilter = (
    key: string | null,
    scale: string | null,
    includeRelative: boolean
  ) => {
    setSelectedKey(key);
    setSelectedScale(scale);
    setIncludeRelativeScales(includeRelative);
  };

  useEffect(() => {
    let filtered = tracks;

    if (selectedKey && selectedScale) {
      filtered = filtered.filter(track => {
        const matchKey = track.info.key.note === selectedKey;
        const matchScale = track.info.key.scale === selectedScale;
        if (includeRelativeScales) {
          const relativeKey = 'Calculated Relative Key';
          const relativeScale = 'Calculated Relative Scale';
          return (
            (matchKey && matchScale) ||
            (track.info.key.note === relativeKey &&
              track.info.key.scale === relativeScale)
          );
        } else {
          return matchKey && matchScale;
        }
      });
    }

    setFilteredTracks(filtered);
  }, [tracks, selectedKey, selectedScale, includeRelativeScales]);

  const applyGenreFilter = (selectedGenres: string[]) => {
    if (selectedGenres.length === 0) {
      setFilteredTracks(tracks);
    } else {
      const filtered = tracks.filter(track => {
        return selectedGenres.some(
          genre =>
            Array.isArray(track.info.genre) &&
            track.info.genre.some(trackGenre => trackGenre.maingenre === genre)
        );
      });
      setFilteredTracks(filtered);
    }
  };

  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

  const applyArtistFilter = (selectedArtists: string[]) => {
    setSelectedArtists(selectedArtists);
    if (selectedArtists.length === 0) {
      setFilteredTracks(tracks);
    } else {
      const filtered = tracks.filter(track => {
        return (
          Array.isArray(track.info.relatedartist) &&
          track.info.relatedartist.some(artist =>
            selectedArtists.includes(artist)
          )
        );
      });

      setFilteredTracks(filtered);
    }
  };

  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);

  const applyInstrumentsFilter = (selectedInstruments: string[]) => {
    setSelectedInstruments(selectedInstruments);
    if (selectedInstruments.length === 0) {
      setFilteredTracks(tracks);
    } else {
      const filtered = tracks.filter(track => {
        return (track.instruments as { main: string }[]).some(instrument =>
          selectedInstruments.includes(instrument.main)
        );
      });

      setFilteredTracks(filtered);
    }
  };

  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const applyMoodFilter = (selectedMoods: string[]) => {
    const filtered = tracks.filter(track => {
      return selectedMoods.some(mood => track.info?.mood?.includes(mood));
    });
    setFilteredTracks(filtered);
  };

  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const applyKeywordFilter = (selectedKeywords: string[]) => {
    const filtered = tracks.filter(track => {
      return selectedKeywords.some(
        keyword => track.info?.mood?.includes(keyword)
      );
    });
    setFilteredTracks(filtered);
  };

  const openTrackInfo = () => {
    setIsTrackInfoVisible(true);
  };

  const closeTrackInfo = () => {
    setIsTrackInfoVisible(false);
  };

  return (
    <div className='flex flex-col overflow-scroll bg-white dark:bg-black'>
      <div className='m-0 p-0'>
        <div className='mt-16'>
          <SoundFilter
            tracks={tracks}
            applyTempoFilter={applyTempoFilter}
            applyKeyFilter={applyKeyFilter}
            applyGenreFilter={applyGenreFilter}
            applyArtistFilter={applyArtistFilter}
            selectedArtists={selectedArtists}
            setSelectedArtists={setSelectedArtists}
            applyInstrumentsFilter={applyInstrumentsFilter}
            selectedInstruments={selectedInstruments}
            setSelectedInstruments={setSelectedInstruments}
            applyMoodFilter={applyMoodFilter}
            selectedMoods={selectedMoods}
            setSelectedMoods={setSelectedMoods}
            applyKeywordFilter={applyKeywordFilter}
            selectedKeywords={selectedKeywords}
            setSelectedKeywords={setSelectedKeywords}
          />
        </div>
        <div className='hidden sm:block'>
          <DesktopCatalog
            openTrackInfo={openTrackInfo}
            tracks={filteredTracks}
            playTrack={playTrack}
            isPlaying={isPlaying}
          />
        </div>
        <div className='block sm:hidden'>
          <MobileCatalog
            openTrackInfo={openTrackInfo}
            tracks={filteredTracks}
            playTrack={playTrack}
            isPlaying={isPlaying}
          />
        </div>
        {isMusicPlayerVisible && currentTrack && (
          <MusicPlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioRef={audioRef}
            playPreviousTrack={handleBackwardClick}
            playNextTrack={handleForwardClick}
          />
        )}
        {isTrackInfoVisible && currentTrack && (
          <TrackInfo
            currentTrack={currentTrack}
            audioRef={audioRef}
            closeTrackInfo={closeTrackInfo}
          />
        )}
      </div>
    </div>
  );
};

export default Sounds;

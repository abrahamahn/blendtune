import React from 'react';
import TrackCard from '@/components/common/shared/TrackCard';
import { Track } from '@/types/track';

interface NewTracksProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  togglePlayPause: (track: Track) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const NewTracks: React.FC<NewTracksProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  setIsPlaying,
  togglePlayPause,
  audioRef,
}) => {
  return (
    <div className='w-full mt-8 md:mt-0 sm:mt-0 md:h-auto px-0'>
      <TrackCard
        tracks={tracks}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        togglePlayPause={togglePlayPause}
        audioRef={audioRef}
      />
    </div>
  );
};

export default NewTracks;

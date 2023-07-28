import { MutableRefObject } from 'react';

export interface Track {
  id: number;
  file: string;
  metadata: {
    catalog: string;
    isrc: string;
    iswc: string;
    title: string;
    release: string;
    album: string;
    track: string;
    producer: string;
  };
  info: {
    duration: string;
    bpm: string;
    key: {
      note: string;
      scale: string;
    };
    genre: {
      "1": {
        maingenre: string;
        subgenre: string;
      };
      "2": {
        maingenre: string;
        subgenre: string;
      };
    };
    relatedartist: {
      "1": string;
      "2": string;
      "3": string;
    };
    mood: {
      mood1: string;
      mood2: string;
      mood3: string;
      energy: string;
      color: string;
      character: string;
    };
  };
  arrangement: {
    "1": {
      time1: string;
      section1: string;
    };
    "2": {
      time2: string;
      section2: string;
    };
    "3": {
      time3: string;
      section3: string;
    };
    "4": {
      time4: string;
      section4: string;
    };
    "5": {
      time5: string;
      section5: string;
    };
    "6": {
      time6: string;
      section6: string;
    };
    "7": {
      time7: string;
      section7: string;
    };
    "8": {
      time8: string;
      section8: string;
    };
    "9": {
      time9: string;
      section9: string;
    };
    "10": {
      time10: string;
      section10: string;
    };
  };
  instruments: {
    "1": {
      "main-category": string;
      "sub-category": string;
    };
    "2": {
      "main-category": string;
      "sub-category": string;
    };
    "3": {
      "main-category": string;
      "sub-category": string;
    };
    "4": {
      "main-category": string;
      "sub-category": string;
    };
    "5": {
      "main-category": string;
      "sub-category": string;
    };
  };
  sample: {
    file: string;
    samplepack: string;
    author: string;
    clearance: string;
  };
  creator: {
    "1": {
      name: string;
      producer: boolean;
      songwriter: boolean;
      ipi: string;
      splits: string;
    };
    "2": {
      name: string;
      producer: string;
      songwriter: string;
      ipi: string;
      splits: string;
    };
  };
  exclusive: {
    artistname: string;
    email: string;
    phone: string;
    address: string;
    management: string;
  };
}

export interface IndexProps {
}

export interface HomeProps {
  tracks: Track[];
  currentTrack?: Track;
  playTrack: (track: Track) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  audioRef: MutableRefObject<HTMLAudioElement>;
}

export interface MiniPlayerProps {
  currentTrack?: Track;
  playTrack: (track: Track) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export interface CatalogProps {
  tracks: Track[],
  playTrack: (track: Track) => void,
  isPlaying: boolean,
  currentTrack: Track | undefined,
}

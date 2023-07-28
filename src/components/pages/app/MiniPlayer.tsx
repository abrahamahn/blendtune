import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import * as Icon from 'src/components/icons';

import styles from '@/pages/app/styles/components/MiniPlayer.module.css';
import * as types from '@/types/global';

interface Props extends types.MiniPlayerProps {}

const MiniPlayer: React.FC<Props> = ({ 
  currentTrack,
  playTrack,
  isPlaying,
  setIsPlaying,
  audioRef
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  useEffect(() => {
    if (audioRef.current) {
      const updateTime = () => {
        setCurrentTime(audioRef?.current?.currentTime || 0);
      }
      audioRef.current.addEventListener('timeupdate', updateTime);
      setDuration(audioRef.current.duration);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updateTime);
        }
      }
    }
  }, [audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioRef]);

  const playPauseButton = isPlaying ? (
    <Icon.Pause
      width={5}
      height={5}
      className={styles.miniplayer_controls_play}
      fill="white" 
    />
  ) : (
    <Icon.Play
      width={20}
      height={20}
      className={styles.miniplayer_controls_play}
      fill="white"
    />
  );

  return (
    <div className={styles.miniplayer}>  
      <div className={styles.miniplayer_container}>
        <div className={styles.miniplayer_main_container}>
          <div className={styles.miniplayer_artwork_container}>
            <Image src={`/images/artwork/${currentTrack?.metadata?.catalog ?? 'default'}.jpg`} alt={currentTrack?.metadata?.title ?? ''} className={styles.miniplayer_artwork} width={35} height={35}/>

          </div>
          <div className={styles.miniplayer_info}>
            <div className={styles.miniplayer_info_title_container}>
              <p className={styles.miniplayer_info_title}>{currentTrack?.metadata.title}</p>
            </div>
            <div className={styles.miniplayer_info_metadata_container}>
              <p className={styles.miniplayer_info_key}>{currentTrack?.info.key.note}{currentTrack?.info.key.scale.substring(0,3)}</p>
              <p className={styles.miniplayer_info_bpm}>{currentTrack?.info.bpm}BPM</p>
            </div>
          </div>
          <div className={styles.miniplayer_controls}>
            <div className={styles.miniplayer_controls_plus_container}>
              <Icon.Plus width={18} height={18} fill="white" className={styles.miniplayer_controls_plus}/>
            </div>
            <div 
              className={styles.miniplayer_controls_play_container}
              onClick={() => setIsPlaying(!isPlaying)}
            >    
              {playPauseButton}
            </div>
          </div>
        </div>
        <div className={styles.miniplayer_progress_bar_container}>
          <audio
            className={styles.audio}
            src={`/audio/tracks/${currentTrack?.file}`}
            controls
            ref={audioRef}
            autoPlay={isPlaying}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />
          <div className={styles.miniplayer_progress_bar}>
            <div
              className={styles.miniplayer_progress_bar_filled}
              style={{ width: `${(currentTime / (audioRef?.current?.duration ?? 1)) * 100}%` }}
            />
            <div
              className={styles.miniplayer_progress_thumb}
              style={{ left: `calc(${(currentTime / (audioRef?.current?.duration ?? 1)) * 100}%)` }}
                onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                  const handleMouseMove = (event: MouseEvent) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = event.clientX - rect.width;
                  const fraction = x / e.currentTarget.offsetWidth;
                  if (audioRef && audioRef.current) {
                    audioRef.current.currentTime = duration * fraction;
                  }
                  setCurrentTime(audioRef?.current?.currentTime ?? 0);
                };
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                  });
                }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
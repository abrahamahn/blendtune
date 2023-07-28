import React from 'react';
import Image from 'next/image';
import * as Icon from '@/components/icons';

import styles from '@/pages/app/styles/components/Catalog.module.css';
import * as types from '@/types/global';

const Catalog: React.FC<types.CatalogProps> = ({
  tracks,
  playTrack,
  currentTrack,
  isPlaying,
}) => {
  function renderValue(value: string) {
    return value && value !== "n/a" && value !== "" ? value : null;
  };

  if (!tracks) {
    return null;
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog_container}>
        {tracks.map((track: types.Track) => (
          <div 
            key={track.id} 
            className={styles.catalog_track}
            onClick = {() => playTrack(track)}
          >
            <div className={styles.catalog_track_artwork_container}>
              <Image src={`/images/artwork/${track.metadata.catalog}.jpg`} alt={track.metadata.title} className={styles.catalog_track_artwork} width="100" height="100"/>
              <div className={styles.catalog_track_play}>
                {isPlaying ? (
                  <Icon.Pause width={25} height={25} fill="white"/>
                ) : (
                  <Icon.Play width={25} height={25} fill="white"/>
                )}
              </div>
            </div>
            <div className={styles.catalog_track_metadata}>
              <div className={styles.catalog_track_metadata_maininfo}>
                <div className={styles.catalog_track_metadata_maininfo_left}>
                  <h3 className={styles.catalog_track_metadata_title}>{renderValue(track.metadata.title)}</h3>
                </div>
                <div className={styles.catalog_track_metadata_maininfo_right}>
                  {renderValue(track.info.genre[1].maingenre) && <p className={styles.catalog_track_metadata_genre}>{renderValue(track.info.genre[1].maingenre)}</p>}
                  {renderValue(track.info.key.note) && renderValue(track.info.key.scale.substring(0,3)) && <p className={styles.catalog_track_metadata_key}>{renderValue(track.info.key.note)}{renderValue(track.info.key.scale.substring(0,3))}</p>}
                  {renderValue(track.info.bpm) && <p className={styles.catalog_track_metadata_bpm}>{renderValue(track.info.bpm)}</p>} 
                </div>
              </div>
              <div className={styles.catalog_track_metadata_subinfo}>
                <div className={styles.catalog_track_metadata_subinfo_left}>
                  {renderValue(track.info.genre[1].subgenre) && <p className={styles.catalog_track_metadata_subgenre}>{renderValue(track.info.genre[1].subgenre)}</p>}
                  {renderValue(track.info.genre[2].maingenre) && <p className={styles.catalog_track_metadata_subgenre}>{renderValue(track.info.genre[2].maingenre)}</p>}
                  {renderValue(track.info.genre[2].subgenre) && <p className={styles.catalog_track_metadata_subgenre}>{renderValue(track.info.genre[2].subgenre)}</p>}
                  {renderValue(track.info.relatedartist[1]) && <p className={styles.catalog_track_metadata_relatedartist}>{renderValue(track.info.relatedartist[1])}</p>}
                  {renderValue(track.info.relatedartist[2]) && <p className={styles.catalog_track_metadata_relatedartist}>{renderValue(track.info.relatedartist[2])}</p>}
                  {renderValue(track.info.relatedartist[3]) && <p className={styles.catalog_track_metadata_relatedartist}>{renderValue(track.info.relatedartist[3])}</p>}
                </div>
                <div className={styles.catalog_track_metadata_subinfo_right}>
                  {renderValue(track.info.mood.mood1) && <p className={styles.catalog_track_metadata_mood}>{renderValue(track.info.mood.mood1)}</p>}
                  {renderValue(track.info.mood.mood2) && <p className={styles.catalog_track_metadata_mood}>{renderValue(track.info.mood.mood2)}</p>}
                  {renderValue(track.info.mood.mood3) && <p className={styles.catalog_track_metadata_mood}>{renderValue(track.info.mood.mood3)}</p>}
                  {renderValue(track.info.mood.energy) && <p className={styles.catalog_track_metadata_mood}>{renderValue(track.info.mood.energy)}</p>}
                  {renderValue(track.info.mood.color) && <p className={styles.catalog_track_metadata_mood}>{renderValue(track.info.mood.color)}</p>}
                  {renderValue(track.info.mood.character) && <p className={styles.catalog_track_metadata_mood}>{renderValue(track.info.mood.character)}</p>} 
                </div>
              </div>
            </div>
            <div className={styles.catalog_track_buttons}>
              <div className={styles.catalog_track_buttons_plus}>
                <Icon.Plus width={18} height={18} fill="var(--light-color)"/>
              </div>
              <div className={styles.catalog_track_buttons_more_info}>
                <Icon.MoreInfo width={15} height={15} fill="var(--light-color)"/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
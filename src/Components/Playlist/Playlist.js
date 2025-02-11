import React from "react";
import styles from './Playlist.module.css';
import Tracklist from "../TrackList/TrackList";

function Playlist(props) {

  const handleNameChange = e =>{
    props.onNameChange(e.target.value);
  }

  return (
    <div className={styles.Playlist}>
      <input onChange={handleNameChange} value={props.playlistName}/>
      {/* <!-- Add a TrackList component --> */}
      <Tracklist userSearchResults={props.playlistTracks} onRemove={props.onRemove} isRemoval={true}/>
      <button className={styles['Playlist-save']} onClick={props.onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;
import React from "react";
import styles from './TrackList.module.css';
import Track from '../Track/Track';

function Tracklist (props) {
    return (
        <div className={styles.TrackList}>
          {
            props.userSearchResults.map(t=>{
              return <Track track={t} key={t.id} onAdd={props.onAdd} isRemoval={props.isRemoval} onRemove={props.onRemove}/>
            })
          }
      </div>
    );
}

export default Tracklist;
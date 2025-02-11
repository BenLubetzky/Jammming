import React, {useState} from "react";
import styles from './App.module.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import { Spotify } from "../../util/Spotify/Spotify";

function App () {

    const [searchResults, setSearchResults] = useState([]);

    const[playlistName, setPlaylistName] = useState("New playlist");
    const [playlistTracks, setPlaylistTracks] = useState([])

    const addTrack = (track) =>{
      const foundTrack = playlistTracks.find(p=>{
        return track.id === p.id;
      });
      if (!foundTrack){
        setPlaylistTracks(prev=>{
          return [track, ...prev];
        })
      }
      else{
        console.log("Track already exists");
      }
    }

    const removeTrack = track =>{
      setPlaylistTracks(prev=>{
        return prev.filter(t=>{
          return t.id != track.id
        })
      })
    }

    const updatePlaylistName = name =>{
      setPlaylistName(name);
    }

    const savePlaylist = () =>{
      const trackUris = playlistTracks.map(t=>(t.uri));
      Spotify.savePlaylist(playlistName, trackUris);
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    }

    const search = term =>{
      Spotify.search(term).then(result=>setSearchResults(result));
    }

    return (
        <div>
        <h1>
          Ja<span className={styles.highlight}>mmm</span>ing
        </h1>
        <div className={styles.App}>
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar onSearch={search}/>
          <div className={styles['App-playlist']}>
            {/* <!-- Add a SearchResults component --> */}
            <SearchResults userSearchResults={searchResults} onAdd={addTrack}/>
            {/* <!-- Add a Playlist component --> */}
            <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist}/>
          </div>
        </div>
      </div>
        );
}

export default App;
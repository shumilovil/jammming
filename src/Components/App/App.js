import React from 'react';

import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then(response => {
      this.setState({ searchResults: response });
    });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((element) => element.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {      
      this.setState({ playlistName: 'New Playlist', playlistTracks: [] });
    });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  addTrack(track) {
    let newPlayList = this.state.playlistTracks;
    const checkTrack = this.state.playlistTracks.some((element) => element.id === track.id);
    if (!checkTrack) {
      newPlayList.push(track);
      this.setState({playlistTracks: newPlayList});
    };
  }

  removeTrack(track) {
    const playlistAfterDel = this.state.playlistTracks.filter(element => element.id !== track.id)
    this.setState({playlistTracks: playlistAfterDel});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack} />

            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  };

};





export default App;

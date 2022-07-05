import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/album.css';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      album: '',
      musics: [],
      favSongs: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.recoverFavSongs();
    this.fetchApi(id);
  }

  recoverFavSongs = async () => {
    const favoritedSongs = await getFavoriteSongs();
    this.setState({
      favSongs: favoritedSongs,
    });
  };

  fetchApi = async (id) => {
    const apiResults = await getMusics(id);
    this.setState({
      artist: apiResults[0].artistName,
      album: apiResults[0].collectionName,
      musics: apiResults,
      loading: false,
    });
  };

  checkFavorited = (currSong) => {
    const { trackId, trackName, previewUrl } = currSong;
    const { favSongs } = this.state;
    return favSongs.some((song) => song.trackId === trackId
      && song.trackName === trackName
      && song.previewUrl === previewUrl);
  };

  createMusicList = () => {
    const { artist, album, musics } = this.state;
    const songs = musics.filter((song) => song.kind === 'song');

    return (
      <main className="album-main">
        <div className="album-info">
          <img src={ musics[0].artworkUrl100 } alt={ `${album} album cover.` } />
          <h2 data-testid="album-name">{ album }</h2>
          <h3 data-testid="artist-name">{ artist }</h3>
        </div>
        { songs.map((song) => (
          <MusicCard
            key={ song.trackId }
            trackName={ song.trackName }
            trackId={ song.trackId }
            previewUrl={ song.previewUrl }
            favorited={ this.checkFavorited(song) }
          />
        ))}
      </main>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { loading
          ? <Loading loading="big loading" />
          : this.createMusicList()}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;

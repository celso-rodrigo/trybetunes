import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      favSongs: undefined,
    };

    this.getFavSongs = this.getFavSongs.bind(this);
    this.loadFavs = this.loadFavs.bind(this);
  }

  componentDidMount() {
    this.getFavSongs();
  }

  async getFavSongs() {
    this.setState({ loading: true });
    const favSongs = await getFavoriteSongs();
    this.setState({
      favSongs,
      loading: false,
    });
  }

  loadFavs() {
    const { favSongs } = this.state;
    return (
      favSongs.map((song) => (
        <MusicCard
          key={ `${song.trackName}-${song.trackId}` }
          trackName={ song.trackName }
          trackId={ song.trackId }
          previewUrl={ song.previewUrl }
          reloadFavPage={ this.getFavSongs }
        />
      )));
  }

  render() {
    const { loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {loading
          ? <Loading loading="big loading" />
          : this.loadFavs()}
      </div>
    );
  }
}

export default Favorites;

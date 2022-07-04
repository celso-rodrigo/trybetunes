import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      album: '',
      musics: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.fetchApi(id);
  }

  fetchApi = async (id) => {
    const apiResults = await getMusics(id);
    this.setState({
      artist: apiResults[0].artistName,
      album: apiResults[0].collectionName,
      musics: apiResults,
      loading: false,
    });
  };

  createMusicList = () => {
    const { artist, album, musics } = this.state;
    const songs = musics.filter((song) => song.kind === 'song');
    return (
      <div>
        <h2 data-testid="album-name">{ album }</h2>
        <h3 data-testid="artist-name">{ artist }</h3>
        { songs.map((song) => (
          <MusicCard
            key={ song.trackId }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
          />
        ))}
      </div>
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

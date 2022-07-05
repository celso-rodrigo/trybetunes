import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../styles/album.css';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      favSongs: undefined,
    };
  }

  componentDidMount() {
    this.setFavState();
  }

  setFavState = async () => {
    const favObj = await getFavoriteSongs();
    this.setState({
      favSongs: favObj,
      loading: false,
    });
  }

  handleCheckbox = async ({ target }) => {
    const { checked } = target;
    const { trackName, previewUrl, trackId, reloadFavPage } = this.props;

    this.setState(({ loading: true }));

    if (checked) {
      await addSong({ trackId, trackName, previewUrl });
    } else {
      await removeSong({ trackId, trackName, previewUrl });
    }
    if (window.location.pathname === '/favorites') reloadFavPage();
    this.setFavState();
  };

  isFavorited = (trackName, previewUrl, trackId) => {
    const { favSongs } = this.state;
    return favSongs.some((song) => song.trackId === trackId
    && song.trackName === trackName
    && song.previewUrl === previewUrl);
  };

  render() {
    const { loading } = this.state;
    const { trackName, previewUrl, trackId } = this.props;

    const favCheckbox = () => (
      <label htmlFor={ `fav-${trackName}` }>
        <div className="fav-container">
          <p>Favoritar:</p>
          <input
            id={ `fav-${trackName}` }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ this.isFavorited(trackName, previewUrl, trackId) }
            onChange={ this.handleCheckbox }
          />
        </div>
      </label>
    );

    return (
      <div className="music-preview-container">
        <hr />
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        { loading
          ? <Loading loading="small loading" />
          : favCheckbox() }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  reloadFavPage: PropTypes.func.isRequired,
};

export default MusicCard;

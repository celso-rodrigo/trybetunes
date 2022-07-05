import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../styles/album.css';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      loading: false,
    };
  }

  handleCheckbox = async ({ target }) => {
    const { checked } = target;
    const { trackName, previewUrl, trackId } = this.props;

    this.setState((prevState) => ({
      loading: true,
      checked: !prevState.checked,
    }));
    if (checked) {
      await addSong({ trackId, trackName, previewUrl });
      await getFavoriteSongs();
    } else {
      await removeSong({ trackId, trackName, previewUrl });
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;

    const favCheckbox = () => (
      <label htmlFor={ `fav-${trackName}` }>
        <div className="fav-container">
          <p>Favoritar:</p>
          <input
            id={ `fav-${trackName}` }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
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
};

export default MusicCard;

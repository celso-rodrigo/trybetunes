import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      loading: false,
    };
  }

  handleFavorites = async () => {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked } = this.state;
    if (checked) {
      await addSong({ trackId, trackName, previewUrl });
    } else {
      await removeSong({ trackId, trackName, previewUrl });
    }
    this.setState({ loading: false });
  };

  handleCheckbox = async () => {
    this.setState((prevState) => ({
      loading: true,
      checked: !prevState.checked,
    }), () => this.handleFavorites());
  };

  render() {
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;

    const favCheckbox = () => (
      <label htmlFor={ `fav-${trackName}` }>
        Favoritar
        <input
          id={ `fav-${trackName}` }
          type="checkbox"
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ this.handleCheckbox }
          checked={ checked }
        />
      </label>
    );

    return (
      <div>
        <p>{ trackName }</p>
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

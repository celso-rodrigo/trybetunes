import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

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
        Favorita
        <input
          id={ `fav-${trackName}` }
          type="checkbox"
          data-testid={ `checkbox-music-${trackId}` }
          checked={ checked }
          onChange={ this.handleCheckbox }
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

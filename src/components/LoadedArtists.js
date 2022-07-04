import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class LoadedArtists extends Component {
  render() {
    const { artistObj, artistName } = this.props;
    return (
      <div className="all-albums-container">
        { artistObj.length === 0
          ? <h2>Nenhum álbum foi encontrado</h2>
          : <h2 className="search-title">{ `Resultado de álbuns de: ${artistName}`}</h2> }
        { artistObj.map((artist) => (
          <div
            key={ `${artist.collectionName}${artist.collectionId}` }
            className="album-container"
          >
            <h3>{ artist.collectionName }</h3>
            <img src={ artist.artworkUrl100 } alt={ artist.artistName } />
            <Link
              to={ `/album/${artist.collectionId}` }
              data-testid={ `link-to-album-${artist.collectionId}` }
            >
              Album
            </Link>
          </div>)) }
      </div>
    );
  }
}

LoadedArtists.propTypes = {
  artistObj: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  })).isRequired,
  artistName: PropTypes.string.isRequired,
};

export default LoadedArtists;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loading extends Component {
  render() {
    const { loading } = this.props;

    return (
      <div className="loading-container">
        <p className={ loading }>Carregando...</p>
      </div>
    );
  }
}

Loading.propTypes = {
  loading: PropTypes.string.isRequired,
};

export default Loading;

import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchBar: '',
      invalidSearch: true,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch({ target }) {
    const { value } = target;
    this.setState({
      searchBar: value,
      invalidSearch: value.length <= 1,
    });
  }

  render() {
    const { searchBar, invalidSearch } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-input">
          <input
            id="search-input"
            type="text"
            data-testid="search-artist-input"
            value={ searchBar }
            onChange={ this.handleSearch }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ invalidSearch }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;

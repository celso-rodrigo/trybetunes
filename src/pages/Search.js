import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadedArtists from '../components/LoadedArtists';
import '../styles/general.css';
import '../styles/search.css';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      searchResults: undefined,
      searchBar: '',
      invalidSearch: true,
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
  }

  handleSearchInput({ target }) {
    const { value } = target;
    this.setState({
      searchBar: value,
      invalidSearch: value.length <= 1,
    });
  }

  async fetchApi(keyWord) {
    this.setState({ loading: true });
    const searchResult = await searchAlbumsAPI(keyWord);
    this.setState({
      searchResults: searchResult,
      loading: false,
    });
  }

  searchInputs() {
    const { searchBar, invalidSearch } = this.state;
    return (
      <div className="search-container">
        <label htmlFor="search-input">
          <input
            id="search-input"
            type="text"
            data-testid="search-artist-input"
            value={ searchBar }
            onChange={ this.handleSearchInput }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ invalidSearch }
          onClick={ () => this.fetchApi(searchBar) }
        >
          Pesquisar
        </button>
      </div>
    );
  }

  render() {
    const { searchResults, loading, searchBar } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading
          ? <Loading loading="big loading" />
          : this.searchInputs()}
        <main>
          { searchResults !== undefined
          && <LoadedArtists artistObj={ searchResults } artistName={ searchBar } /> }
        </main>
      </div>
    );
  }
}

export default Search;

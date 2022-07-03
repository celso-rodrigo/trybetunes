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
      searchInput: '',
      searchArtist: '',
      invalidSearch: true,
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
  }

  handleSearchInput({ target }) {
    const { value } = target;
    this.setState({
      searchInput: value,
      invalidSearch: value.length <= 1,
    });
  }

  async fetchApi(keyWord) {
    this.setState({ loading: true });
    const searchResult = await searchAlbumsAPI(keyWord);
    const { searchInput } = this.state;
    this.setState({
      searchResults: searchResult,
      searchArtist: searchInput,
      searchInput: '',
      loading: false,
    });
  }

  searchInputs() {
    const { searchInput: searchBar, invalidSearch } = this.state;
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
    const { searchResults, loading, searchArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading
          ? <Loading loading="big loading" />
          : this.searchInputs()}
        <main>
          { searchResults !== undefined
          && <LoadedArtists artistObj={ searchResults } artistName={ searchArtist } /> }
        </main>
      </div>
    );
  }
}

export default Search;

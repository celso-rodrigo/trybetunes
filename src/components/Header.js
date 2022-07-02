import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: '',
    };
  }

  componentDidMount() {
    this.isMount = true;
    this.setState({ loading: true }, async () => {
      const userInfo = await getUser();
      if (this.isMount) {
        this.setState({
          loading: false,
          user: userInfo.name,
        });
      }
    });
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  render() {
    const { loading, user } = this.state;

    return (
      <header data-testid="header-component">
        { loading
          ? <Loading />
          : <p data-testid="header-user-name">{ user }</p> }
        Header
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;

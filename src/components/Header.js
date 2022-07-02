import React, { Component } from 'react';
import Loading from '../pages/Loading';
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
    this.setState({ loading: true }, async () => {
      const userInfo = await getUser();
      this.setState({
        loading: false,
        user: userInfo.name,
      });
    });
  }

  render() {
    const { loading, user } = this.state;

    return (
      <header data-testid="header-component">
        { loading
          ? <Loading />
          : <p data-testid="header-user-name">{ user }</p> }
        Header
      </header>
    );
  }
}

export default Header;

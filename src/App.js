import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      login: '',
      loguedIn: false,
      invalidLogin: true,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.isMount = true;
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  handleLogin({ target }) {
    const { value } = target;
    this.setState({
      login: value,
      invalidLogin: (value.length <= 2),
    });
  }

  handleClick() {
    const { login } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: login });
      if (this.isMount) {
        this.setState({ loading: false, loguedIn: true });
      }
    });
  }

  render() {
    const {
      login,
      loading,
      invalidLogin,
      loguedIn,
    } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login
              loading={ loading }
              login={ login }
              handleLogin={ this.handleLogin }
              invalidLogin={ invalidLogin }
              handleClick={ this.handleClick }
              loguedIn={ loguedIn }
            />
          </Route>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

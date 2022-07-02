import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';

class Login extends Component {
  render() {
    const {
      loading,
      handleClick,
      handleLogin,
      invalidLogin,
      loguedIn,
    } = this.props;

    const loginPage = () => (
      <form>
        <label htmlFor="name-input">
          <p>Nome de usuário:</p>
          <input
            id="name-input"
            type="text"
            data-testid="login-name-input"
            onChange={ handleLogin }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ invalidLogin }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    );

    return (
      <div data-testid="page-login">
        { loguedIn && <Redirect to="/search" /> }
        { loading
          ? <Loading />
          : loginPage() }

      </div>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  invalidLogin: PropTypes.bool.isRequired,
  loguedIn: PropTypes.bool.isRequired,
};

export default Login;

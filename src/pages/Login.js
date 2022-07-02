import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import '../styles/general.css';
import '../styles/login.css';

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
      <>
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
      </>
    );

    return (
      <div data-testid="page-login" className="login-container">
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

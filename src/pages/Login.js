import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      isDisabled: true,
      loading: false,
      userCreated: false,
    };
  }

  handleLogin = (event) => {
    const maxLength = 3;
    const name = event.target.value;
    this.setState({
      username: name,
    });
    if (name.length >= maxLength) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleRedirect() {
    return <Redirect to="/search" />;
  }

  handleUser = async () => {
    const { username } = this.state;

    this.setState({ loading: true });
    const response = await createUser({ name: username });
    if (response) this.setState({ userCreated: true });
    this.setState({ loading: false });
  }

  render() {
    const { isDisabled, loading, userCreated } = this.state;
    return (
      loading
        ? <Loading />
        : (
          <form data-testid="page-login">
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleLogin }
            />
            <button
              onClick={ () => this.handleUser() }
              disabled={ isDisabled }
              data-testid="login-submit-button"
              type="button"
            >
              Entrar
            </button>
            {userCreated && <Redirect to="/search" />}
          </form>)

    );
  }
}

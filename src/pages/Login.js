import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import '../styles/Login.css';

const userAPI = require('../services/userAPI');

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      saved: false,
      disabled: true,
      clicked: false,
      mounted: false,
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  handleChange = ({ target: { value } }) => {
    const currLength = value.length;
    const minLength = 3;
    this.setState({ name: value,
      disabled: currLength < minLength });
  }

  handleClick = async () => {
    const { name, mounted } = this.state;
    if (mounted) {
      this.setState({ clicked: true });
      await userAPI.createUser({ name });
      this.setState({ saved: true });
    }
  }

  render() {
    const { name, saved, disabled, clicked } = this.state;
    const isLoading = clicked && !saved;
    const isSaved = clicked && saved;
    return (
      <>
        {isLoading ? <Loading /> : (
          <div className="login" data-testid="page-login">
            <h1 className="login-title">Login</h1>
            <form>
              <input
                className="input"
                type="text"
                placeholder="Nome"
                data-testid="login-name-input"
                value={ name }
                onChange={ this.handleChange }
              />
              <button
                className="btn-invert"
                type="button"
                data-testid="login-submit-button"
                onClick={ this.handleClick }
                disabled={ disabled }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
        {isSaved && <Redirect to="/search" />}
      </>
    );
  }
}

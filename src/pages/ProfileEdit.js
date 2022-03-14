import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';

const userAPI = require('../services/userAPI');

export default class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      mounted: false,
      loading: true,
      user: {},
      disabled: true,
      saved: false,
    };
  }

  componentDidMount() {
    this.setState({ mounted: true }, () => this.fetchUser());
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  fetchUser = async () => {
    const { mounted } = this.state;
    if (mounted) {
      const user = await userAPI.getUser();
      this.setState({ user, loading: false }, () => this.verifyForm());
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevSt) => ({
      ...prevSt,
      user: {
        ...prevSt.user,
        [name]: value,
      },
    }), () => this.verifyForm());
  }

  verifyForm = () => {
    const { user: { name, email, description, image } } = this.state;
    let disabled = true;
    const validateArr = [name, email, description, image];
    const isEmpty = validateArr.some((item) => item === '');
    const isEmailValid = this.checkEmail(email);
    if (!isEmpty && isEmailValid) disabled = false;
    this.setState({ disabled });
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { mounted } = this.state;
    if (mounted) {
      this.setState({ loading: true });
      const { user } = this.state;
      await userAPI.updateUser(user);
      this.setState({ saved: true, loading: false });
    }
  }

  checkEmail = (value) => {
    const isValid = value.match(/[\w.!#$%&'*+=?^_`{|}~-]+@[\w.-]+\.[A-Z]{2,}/gi);
    return isValid;
  }

  render() {
    const { loading, user, disabled, saved } = this.state;
    const { name, email, image, description } = user;
    return (
      <div className="profile-edit" data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form className="flex-container-v">
            <input
              className="input"
              type="text"
              placeholder="Nome"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="edit-input-name"
            />
            <input
              className="input"
              type="email"
              name="email"
              value={ email }
              placeholder="E-mail"
              onChange={ this.handleChange }
              data-testid="edit-input-email"
            />
            <textarea
              className="textarea"
              placeholder="Descrição"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="edit-input-description"
            />
            <input
              className="input"
              type="text"
              name="image"
              placeholder="Foto"
              value={ image }
              onChange={ this.handleChange }
              data-testid="edit-input-image"
            />
            <button
              className="button"
              type="button"
              data-testid="edit-button-save"
              onClick={ this.handleClick }
              disabled={ disabled }
            >
              Salvar
            </button>
          </form>
        )}
        {saved && <Redirect to="/profile" />}
      </div>
    );
  }
}

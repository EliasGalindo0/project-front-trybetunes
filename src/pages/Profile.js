import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../styles/Profile.css';

const userAPI = require('../services/userAPI');

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      mounted: false,
      loading: true,
      user: {},
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
      this.setState({ user, loading: false });
    }
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div className="profile" data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <section className="profile-sect">
            <section className="flex-container-h flex-img-sect">
              <section className="img-sect">
                <img
                  className="profile-image"
                  data-testid="profile-image"
                  src={ user.image }
                  alt={ user.name }
                />
              </section>
              <Link className="link-edit" to="/profile/edit">Editar perfil</Link>
            </section>
            <section className="flex-container-h flex-profile">
              <h3 className="profile-title">Nome: </h3>
              <p className="profile-content">{user.name}</p>
            </section>
            <section className="flex-container-h  flex-profile">
              <h3 className="profile-title">Email: </h3>
              <p className="profile-content">{ user.email }</p>
            </section>
            <h3 className="profile-title">Descrição: </h3>
            <p className="profile-content">{user.description}</p>
          </section>
        )}
      </div>
    );
  }
}

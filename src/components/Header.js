import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    this.setState({ loading: true });
    const userObj = await getUser();
    this.setState({ loading: false });
    this.setState({
      user: userObj.name,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading
            ? <Loading />
            : (<p data-testid="header-user-name">{user}</p>)
        }

        <nav>
          <ul>
            <li>
              <Link data-testid="link-to-search" to="/search">
                Search
              </Link>
            </li>
            <li>
              <Link data-testid="link-to-favorites" to="/favorites">
                Favorites
              </Link>
            </li>
            <li>
              <Link data-testid="link-to-profile" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </nav>

      </header>
    );
  }
}

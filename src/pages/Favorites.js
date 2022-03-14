import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

const favoriteSogsAPI = require('../services/favoriteSongsAPI');

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      mounted: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({ mounted: true }, () => this.getStorage());
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  handleCheckboxChange = async ({ target }, music) => {
    this.setState({ loading: true });
    const { favorites } = this.state;
    if (!target.checked) {
      const newList = favorites.filter(({ trackId }) => trackId !== music.trackId);
      await favoriteSogsAPI.removeSong(music);
      this.setState({ favorites: newList, loading: false });
    }
  }

  getStorage = async () => {
    const { mounted } = this.state;
    if (mounted) {
      const favorites = await favoriteSogsAPI.getFavoriteSongs();
      this.setState({ favorites, loading: false });
    }
  }

  render() {
    const { favorites, loading } = this.state;
    return (
      <div className="favorites" data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : (
          <section className="tracks-sect-fave">
            {favorites.map((music) => (
              <section className="track" key={ music.trackId }>
                <MusicCard
                  music={ music }
                />
                <label className="label" htmlFor={ `favorite-${music.trackId}` }>
                  <input
                    className="checkbox"
                    id={ `favorite-${music.trackId}` }
                    type="checkbox"
                    name="favorite"
                    data-testid={ `checkbox-music-${music.trackId}` }
                    onChange={ (event) => this.handleCheckboxChange(event, music) }
                    checked={ favorites
                      .some(({ trackName }) => music.trackName === trackName) }
                  />
                  Favorita
                </label>
              </section>
            ))}
          </section>
        )}
      </div>
    );
  }
}

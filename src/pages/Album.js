import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import '../styles/Album.css';

const favoriteSogsAPI = require('../services/favoriteSongsAPI');

export default class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      mounted: false,
      artist: '',
      album: '',
      loading: true,
      favorites: [],
    };
  }

  componentDidMount() {
    this.setState({ mounted: true }, () => {
      this.getAlbum();
      this.getStorage();
    });
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  getStorage = async () => {
    const favorites = await favoriteSogsAPI.getFavoriteSongs();
    this.setState({ favorites });
  }

  getAlbum = async () => {
    const { mounted } = this.state;
    const { match: { params: { id } } } = this.props;
    if (mounted) {
      const musics = await getMusics(id);
      this.setState({ musics,
        album: musics[0].collectionName,
        artist: musics[0].artistName,
        image: musics[0].artworkUrl100,
        loading: false });
    }
  }

  handleCheckboxChange = ({ target }, music) => {
    this.setState({ loading: true });
    const { favorites } = this.state;
    const { checked } = target;
    if (checked) {
      this.setState({ favorites: [...favorites, music] });
      this.saveSong(music);
    } else {
      this.setState({
        favorites: favorites
          .filter((favorite) => favorite.trackId !== music.trackId) });
      this.deleteSong(music);
    }
  }

  deleteSong = async (music) => {
    await favoriteSogsAPI.removeSong(music);
    this.setState({ loading: false });
  }

  saveSong = async (music) => {
    await favoriteSogsAPI.addSong(music);
    const newList = await favoriteSogsAPI.getFavoriteSongs();
    this.setState({ favorites: newList }, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { musics, artist, album, image, loading, favorites } = this.state;
    return (
      <div className="album" data-testid="page-album">
        <Header />
        <section className="flex-container-h album">
          <section className="album-sect">
            <img className="album-img" src={ image } alt={ `${album} - ${artist}` } />
            <h3 className="album-title" data-testid="album-name">{ album }</h3>
            <p className="album-singer" data-testid="artist-name">{ artist }</p>
          </section>
          {loading ? <Loading /> : (
            <section className="tracks-sect">
              {musics.map((music, index) => {
                if (index !== 0) {
                  return (
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
                  );
                }
                return null;
              })}
            </section>
          )}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

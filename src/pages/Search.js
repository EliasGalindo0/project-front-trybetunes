import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      searched: '',
      disabled: true,
      mounted: false,
      loading: false,
      albums: [],
      requested: false,
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
    const minLength = 2;
    this.setState({
      artist: value,
      disabled: currLength < minLength,
    });
  }

  handleClick = async () => {
    const { mounted, artist } = this.state;
    this.setState({ artist: '', loading: true, searched: artist });
    if (mounted) {
      const album = await searchAlbumsAPI(artist);
      this.setState({ loading: false, albums: album, requested: true });
    }
  }

  render() {
    const { searched, artist, disabled, loading, albums, requested } = this.state;
    const showInput = !loading && !requested;
    return (
      <div className="search" data-testid="page-search">
        <Header />
        <section className="search-sect">
          <input
            className="input"
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do artista"
            value={ artist }
            onChange={ this.handleChange }
          />
          <button
            className="button"
            type="button"
            data-testid="search-artist-button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </section>
        {loading && <Loading />}
        {!loading && albums.length === 0
        && !showInput && <h2 className="title-music">Nenhum álbum foi encontrado</h2>}
        {!loading && albums.length !== 0 && !showInput && (
          <>
            <h2 className="title-music">{`Resultado de álbuns de: ${searched}`}</h2>
            <ul className="cards-sect">
              {albums.map((album) => (
                <li key={ album.collectionId } className="music-card">
                  <Link
                    className="link-music"
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <img
                      className="music-img"
                      src={ album.artworkUrl100 }
                      alt={ `${album.collectionName} - ${album.artistName}` }
                    />
                    <h3 className="music-album">{ album.collectionName }</h3>
                    <p className="music-singer">{ album.artistName }</p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      lastArtist: '',
      isDisabled: true,
      loading: false,
      albums: [],
    };
  }

    handleSearch = (e) => {
      const maxLength = 2;
      const searchText = e.target.value;
      this.setState({
        search: searchText,
      });
      if (searchText.length >= maxLength) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    }

    handleSearchAlbums = async () => {
      const { search } = this.state;
      this.setState({ loading: true, lastArtist: search, search: '' });
      const artist = await searchAlbumsAPI(search);

      this.setState({ albums: artist, loading: false });
    }

    render() {
      const { isDisabled, search, loading, lastArtist, albums } = this.state;
      return (
        <>
          <Header />
          <div data-testid="page-search">
            {
              loading
                ? <Loading />
                : (
                  <div className="container">
                    <div className="input-container">
                      <input
                        data-testid="search-artist-input"
                        type="text"
                        placeholder="Nome do Artista"
                        onChange={ this.handleSearch }
                        value={ search }
                      />
                      <button
                        onClick={ this.handleSearchAlbums }
                        disabled={ isDisabled }
                        data-testid="search-artist-button"
                        type="button"
                      >
                        Procurar
                      </button>
                    </div>
                    {
                      lastArtist
                      && (
                        <div className="artist-container">
                          <h2>
                            Resultado de álbuns de:
                            {' '}
                            {''}
                            {lastArtist}
                          </h2>

                          <div className="albums-container">
                            {
                              albums.length > 0
                                ? albums.map(
                                  ({
                                    collectionId,
                                    collectionName,
                                    artworkUrl100,
                                    artistName,
                                    artistId,
                                  }) => (
                                    <div
                                      key={ `${artistId}-${collectionId}` }
                                      className="album"
                                    >
                                      <img src={ artworkUrl100 } alt={ artistName } />
                                      <h3>

                                        <Link
                                          to={ `/album/${collectionId}` }
                                          data-testid={ `link-to-album-${collectionId}` }
                                        />
                                        {collectionName}
                                      </h3>
                                      <p>{artistName}</p>
                                    </div>
                                  ),
                                )
                                : <span>Nenhum álbum foi encontrado</span>
                            }
                          </div>
                        </div>
                      )
                    }
                  </div>)
            }
          </div>
        </>
      );
    }
}

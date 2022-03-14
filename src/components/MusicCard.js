import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MusicCard.css';

export default class MusicCard extends React.Component {
  render() {
    const { music } = this.props;
    return (
      <section className="music">
        <p className="track-name">{music.trackName}</p>
        <audio
          className="audio"
          data-testid="audio-component"
          src={ music.previewUrl }
          controls
        >
          <track kind="captions" />
        </audio>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

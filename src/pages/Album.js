import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <p>Album</p>
        </div>
      </>
    );
  }
}

export default Album;

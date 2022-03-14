import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className="not-found">
        <h1>Ops!</h1>
        <h2>A página que você está procurando não foi encontrada.</h2>
      </div>
    );
  }
}

import React, { Component } from 'react';
import '../styles/Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <>
        <h1>Carregando...</h1>
        <img src="https://thumbs.dreamstime.com/z/desenhos-animados-chaves-do-%C3%ADcone-da-m%C3%BAsica-88210237.jpg" alt="load-icon" className="loading" />
      </>
    );
  }
}

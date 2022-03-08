import React, { Component } from 'react';
import Header from '../components/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <p>ProfileEdit</p>
        </div>
      </>
    );
  }
}

export default ProfileEdit;

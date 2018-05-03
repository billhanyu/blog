import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationMenu from '../NavigationMenu';

class Profile extends Component {
  render() {
    return (
      <div>
        <NavigationMenu selectedIndex={2}/>
        <h1>Profile</h1>
      </div>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.object,
};

export default Profile;

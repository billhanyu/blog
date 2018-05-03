import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>Profile</h1>
      </div>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.object,
};

export default Profile;

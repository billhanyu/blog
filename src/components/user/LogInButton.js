import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

class LogInButton extends Component {
  render() {
    return (
      <FlatButton
        labelStyle={{
          color: 'white',
        }}
        label="Login"
        onClick={() => {
          this.props.history.push('/login');
        }}
      />
    );
  }
}

LogInButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LogInButton);

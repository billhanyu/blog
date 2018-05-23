import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class LogInButton extends Component {
  render() {
    return (
      <Button
        style={{color: 'white'}}
        onClick={() => {
          this.props.history.push('/login');
        }}
      >Log In</Button>
    );
  }
}

LogInButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LogInButton);

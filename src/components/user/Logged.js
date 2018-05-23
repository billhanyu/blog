import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { logout } from '../../actions/actions';
import PropTypes from 'prop-types';

class Logged extends Component {
  render() {
    return (
      <Button
        style={{color: 'white'}}
        onClick={() => {
          this.props.logout();
        }}
      >Sign Out</Button>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

Logged.propTypes = {
  logout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logged);

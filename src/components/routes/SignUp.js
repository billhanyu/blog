import React, { Component } from 'react';
import LogInForm from '../user/LogInForm';
import NavigationMenu from '../NavigationMenu';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signup } from '../../actions/actions';

class SignUp extends Component {
  render() {
    if (this.props.token) {
      this.props.history.replace('/');
    }
    return (
      <div>
        <NavigationMenu selectedIndex={2} />
        <LogInForm
          onSubmit={this.props.signup}
          signup={true}
          error={this.props.error}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    error: state.user.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (email, name, password) => dispatch(signup(email, name, password)),
  };
};

SignUp.propTypes = {
  token: PropTypes.string,
  history: PropTypes.object,
  signup: PropTypes.func,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));

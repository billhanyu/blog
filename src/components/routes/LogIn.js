import React, { Component } from 'react';
import LogInForm from '../user/LogInForm';
import NavigationMenu from '../NavigationMenu';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/actions';

class LogIn extends Component {
  render() {
    if (this.props.token) {
      this.props.history.replace('/');
    }
    return (
      <div>
        <NavigationMenu selectedIndex={2} />
        <LogInForm
          signup={false}
          onSubmit={this.props.login}
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
    login: (email, password) => dispatch(login(email, password)),
  };
};

LogIn.propTypes = {
  token: PropTypes.string,
  history: PropTypes.object,
  login: PropTypes.func,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogIn));

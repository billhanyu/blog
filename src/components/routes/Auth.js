import React, { Component } from 'react';
import LogInForm from '../user/LogInForm';
import NavigationMenu from '../NavigationMenu';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login, signup, clearAuthError } from '../../actions/actions';

class Auth extends Component {
  componentWillReceiveProps(newProps) {
    if (this.props.type !== newProps.type) {
      this.props.clearAuthError();
    }
  }

  render() {
    if (this.props.token) {
      if (this.props.history.length < 3) {
        this.props.history.replace('/');
      } else {
        this.props.history.goBack();
      }
    }
    const signup = this.props.type === 'signup';
    return (
      <div>
        <NavigationMenu selectedIndex={2} />
        <LogInForm
          signup={signup}
          onSubmit={signup ? this.props.signup : this.props.login}
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
    signup: (email, name, password) => dispatch(signup(email, name, password)),
    clearAuthError: () => dispatch(clearAuthError()),
  };
};

Auth.propTypes = {
  token: PropTypes.string,
  history: PropTypes.object,
  login: PropTypes.func,
  signup: PropTypes.func,
  type: PropTypes.oneOf(['signup', 'login']),
  error: PropTypes.string,
  clearAuthError: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));

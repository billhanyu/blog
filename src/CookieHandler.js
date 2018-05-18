import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { tokenFromCookie } from './actions/actions';
import PropTypes from 'prop-types';

const cookies = new Cookies();

class CookieHandler extends Component {
  componentWillMount() {
    const admin = cookies.get('admin');
    const token = cookies.get('token');
    if (token) {
      this.props.tokenFromCookie(admin, token);
    }
  }

  render() {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    tokenFromCookie: (admin, token) => dispatch(tokenFromCookie(admin, token)),
  };
};

CookieHandler.propTypes = {
  tokenFromCookie: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(CookieHandler);

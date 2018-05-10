import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeSnackBar } from '../../actions/actions';

class AppSnackBar extends Component {
  constructor(props) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose() {
    this.props.closeSnackBar();
  };

  render() {
    return (
      <Snackbar
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={2500}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    open: !(!state.snackbar.message),
    message: state.snackbar.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeSnackBar: () => dispatch(closeSnackBar()),
  };
};

AppSnackBar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  closeSnackBar: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSnackBar);

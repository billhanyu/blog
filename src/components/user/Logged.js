import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { connect } from 'react-redux';
import { logout } from '../../actions/actions';
import PropTypes from 'prop-types';

class Logged extends Component {
  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon color='white' /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Profile" />
        <MenuItem
          primaryText="Sign out"
          onClick={() => {
            this.props.logout();
            location.reload();
          }}
        />
      </IconMenu>
    );
  }
}

Logged.muiName = 'IconMenu';

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

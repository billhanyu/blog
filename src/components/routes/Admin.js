import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationMenu from '../NavigationMenu';
import Paper from 'material-ui/Paper';
import { centeredCard } from '../common/styles';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import Unauthorized from '../common/Unauthorized';

class Admin extends Component {
  render() {
    if (this.props.admin) {
      return (
        <div>
          <NavigationMenu selectedIndex={3}/>
          <Paper
            style={centeredCard}
          >
            <RaisedButton
              primary={true}
              onClick={() => {
                this.props.history.push('/newpost');
              }}
            >New Post</RaisedButton>
          </Paper>
        </div>
      );
    } else {
      return <Unauthorized />;
    }
  }
}

const mapStateToProps = state => {
  return {
    admin: state.user.admin,
  };
};

Admin.propTypes = {
  history: PropTypes.object,
  admin: PropTypes.bool,
};

export default connect(mapStateToProps)(Admin);

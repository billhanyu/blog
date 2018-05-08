import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationMenu from '../NavigationMenu';
import Paper from 'material-ui/Paper';
import { centeredCard } from '../common/styles';
import RaisedButton from 'material-ui/RaisedButton';

class Admin extends Component {
  render() {
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
  }
}

Admin.propTypes = {
  history: PropTypes.object,
};

export default Admin;

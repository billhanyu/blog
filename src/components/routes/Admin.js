import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationMenu from '../NavigationMenu';
import Paper from '@material-ui/core/Paper';
import { centeredCard } from '../common/styles';
import Button from '@material-ui/core/Button';
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
            <Button
              variant='raised'
              color='primary'
              onClick={() => {
                this.props.history.push('/newpost');
              }}
            >New Post</Button>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import Home from '@material-ui/icons/Home';
import Account from '@material-ui/icons/AccountCircle';
const { blogName, githubLink } = require('../config');
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Logged from './user/Logged';
import LogInButton from './user/LogInButton';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavigationMenu extends Component {
  constructor(props) {
    super(props);
    this.handleRequestChange = this.handleRequestChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      selectedIndex: props.selectedIndex,
      open: false,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleRequestChange(event, index) {
    this.lastIndex = this.state.selectedIndex;
    this.setState({
      selectedIndex: index,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Drawer
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div
            tabIndex={0}
            role='button'
            onClick={this.handleClose}
            onKeyDown={this.handleClose}
          >
            <List
              style={{width: 250}}
              value={this.state.selectedIndex}
              onChange={this.handleRequestChange}
            >
              <ListItem button
                value={1}
                onClick={() => {
                  this.props.history.push('/');
                  this.handleClose();
                }}
              >
                <ListItemIcon><Home /></ListItemIcon>
                <ListItemText primary='Home' />
              </ListItem>
              <ListItem button
                value={2}
                onClick={() => {
                  window.open(githubLink);
                  this.setState({
                    selectedIndex: this.lastIndex,
                  });
                }}
              >
                <ListItemIcon>
                  <SvgIcon>
                    <path d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z" />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText primary='GitHub' />
              </ListItem>
              {
                this.props.admin &&
                <ListItem button
                  value={3}
                  onClick={() => {
                    this.props.history.push('/admin');
                    this.handleClose();
                  }}
                >
                  <ListItemIcon><Account /></ListItemIcon>
                  <ListItemText primary='Admin' />
                </ListItem>
              }
            </List>
          </div>
        </Drawer>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='Menu'
              className={classes.menuButton}
              onClick={this.handleOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit' className={classes.flex}>
              {blogName}
            </Typography>
            {this.props.token ? <Logged /> : <LogInButton />}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavigationMenu.propTypes = {
  history: PropTypes.object,
  selectedIndex: PropTypes.number.isRequired,
  token: PropTypes.string,
  admin: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    ...state.user,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(withRouter(NavigationMenu)));

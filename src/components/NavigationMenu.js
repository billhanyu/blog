import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import Home from 'material-ui/svg-icons/action/home';
import Account from 'material-ui/svg-icons/action/account-circle';
const { blogName, githubLink } = require('../config');
import { withRouter } from 'react-router-dom';

const SelectableList = makeSelectable(List);

class NavigationMenu extends Component {
  constructor(props) {
    super(props);
    this.handleRequestChange = this.handleRequestChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      selectedIndex: 1,
      open: false,
    };
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
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
    return (
      <div>
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <SelectableList
            value={this.state.selectedIndex}
            onChange={this.handleRequestChange}
          >
            <ListItem
              value={1}
              primaryText='Home'
              leftIcon={<Home />}
              onClick={() => {
                this.props.history.push('/');
                this.handleClose();
              }}
            />
            <ListItem
              value={2}
              primaryText='Profile'
              leftIcon={<Account />}
              onClick={() => {
                this.props.history.push('/profile');
                this.handleClose();
              }}
            />
            <ListItem
              value={3}
              primaryText='GitHub'
              leftIcon={
                <SvgIcon>
                  <path d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z" />
                </SvgIcon>
              }
              onClick={() => {
                window.open(githubLink);
                this.setState({
                  selectedIndex: this.lastIndex,
                });
              }}
            />
          </SelectableList>
        </Drawer>
        <AppBar
          title={blogName}
          onLeftIconButtonClick={this.handleToggle}
        />
      </div>
    );
  }
}

NavigationMenu.propTypes = {
  history: PropTypes.object,
};

export default withRouter(NavigationMenu);

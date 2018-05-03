import React, { Component } from 'react';
import NavigationMenu from '../NavigationMenu';

class NoMatch extends Component {
  render() {
    return (
      <div>
        <NavigationMenu selectedIndex={-1}/>
        <h1>404 for {window.location.pathname}</h1>
      </div>
    );
  }
}

export default NoMatch;

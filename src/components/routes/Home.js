import React, { Component } from 'react';
import NavigationMenu from '../NavigationMenu';

class Home extends Component {
  render() {
    return (
      <div>
        <NavigationMenu selectedIndex={1}/>
        <h1>Blog Home</h1>
      </div>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import NavigationMenu from '../NavigationMenu';

class Unauthorized extends Component {
  render() {
    return (
      <div>
        <NavigationMenu selectedIndex={1} />
        <h1 style={{textAlign: 'center'}}>
          Unauthorized. Be admin or be Lucy.
        </h1>
      </div>
    );
  }
}

export default Unauthorized;

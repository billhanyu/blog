import React, { Component } from 'react';

class NoMatch extends Component {
  render() {
    return (
      <div>
        <h1>404 for {window.location.pathname}</h1>
      </div>
    );
  }
}

export default NoMatch;

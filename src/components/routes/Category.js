import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Category extends Component {
  render() {
    return (
      <div>
        <h1>Category {this.props.match.params.category}</h1>
      </div>
    );
  }
}

Category.propTypes = {
  match: PropTypes.object,
};

export default Category;

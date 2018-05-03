import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationMenu from '../NavigationMenu';
import SinglePost from '../post/SinglePost';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  render() {
    return (
      <div>
        <NavigationMenu selectedIndex={1} />
        <SinglePost slug={this.props.match.params.post} />
      </div>
    );
  }
}

Post.propTypes = {
  match: PropTypes.object,
};

export default Post;

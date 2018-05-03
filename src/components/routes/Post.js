import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationMenu from '../NavigationMenu';
import axios from 'axios';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  componentWillMount() {
    axios.get(`/posts/${this.props.match.params.post}`, {
      headers: { Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWU3YzBiOGVhZDQwNjUwMDhjZmNkZmUiLCJlbWFpbCI6Imx1Y3kuemhhbmdAZHVrZS5lZHUiLCJuYW1lIjoiTHVjeSBaaGFuZyIsImV4cCI6MTUyNTk2OTAxOCwiaWF0IjoxNTI1MzY0MjE4fQ.3VQv8GKNq8DC7hlYWePTylsUEIJVgxOv7tYf6JalRZc'},
    })
      .then(response => {
        this.setState({
          post: response.data,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <NavigationMenu selectedIndex={1} />
        <h1>Blog {this.props.match.params.post}</h1>
        <p>{this.state.post.body}</p>
      </div>
    );
  }
}

Post.propTypes = {
  match: PropTypes.object,
};

export default Post;

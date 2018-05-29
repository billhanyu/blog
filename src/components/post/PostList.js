import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostCard from './single/PostCard';

class PostList extends Component {
  render() {
    return (
      this.props.all.map(post => {
        return (
          <PostCard
            key={post.slug}
            post={post}
          />
        );
      })
    );
  }
}

PostList.propTypes = {
  all: PropTypes.array,
};

export default PostList;

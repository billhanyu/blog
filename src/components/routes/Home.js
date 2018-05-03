import React, { Component } from 'react';
import NavigationMenu from '../NavigationMenu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../actions/actions';

class Home extends Component {
  componentWillMount() {
    this.props.getAllPosts();
  }

  render() {
    return (
      <div>
        <NavigationMenu selectedIndex={1}/>
        <h1>Blog Home</h1>
        {
          this.props.all.map(post => {
            return (
              <a
                key={post.slug}
                href={`/posts/${post.slug}`}
              >
              {post.title}
              </a>
            );
          })
        }
      </div>
    );
  }
}

Home.propTypes = {
  all: PropTypes.array,
  error: PropTypes.string,
  getAllPosts: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    all: state.posts.all,
    error: state.posts.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPosts: () => dispatch(getAllPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

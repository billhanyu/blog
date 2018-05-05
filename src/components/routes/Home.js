import React, { Component } from 'react';
import NavigationMenu from '../NavigationMenu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../actions/actions';
import PostCard from '../post/PostCard';
import CircularProgress from 'material-ui/CircularProgress';

class Home extends Component {
  componentWillMount() {
    this.props.getAllPosts();
  }

  render() {
    return (
      <div>
        <NavigationMenu selectedIndex={1}/>
        {
          this.props.all.length == 0 &&
          <div style={{width: 60, margin: '200px auto'}}>
            <CircularProgress size={60} thickness={7} />
          </div>
        }
        {
          this.props.all.map(post => {
            return (
              <PostCard
                key={post.slug}
                post={post}
              />
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

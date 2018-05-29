import React, { Component } from 'react';
import NavigationMenu from '../NavigationMenu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../actions/actions';
import ErrorDisplay from '../common/ErrorDisplay';
import Loading from '../common/Loading';
import PostList from '../post/PostList';

class Home extends Component {
  componentWillMount() {
    this.props.getAllPosts();
  }

  render() {
    return (
      <div>
        <NavigationMenu selectedIndex={1} />
        {
          !this.props.ready && !this.props.error &&
          <Loading />
        }
        {
          this.props.error &&
          <ErrorDisplay
            message={this.props.error}
          />
        }
        <PostList all={this.props.all} />
      </div>
    );
  }
}

Home.propTypes = {
  all: PropTypes.array,
  ready: PropTypes.bool,
  error: PropTypes.string,
  getAllPosts: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    all: state.posts.all,
    ready: state.posts.ready,
    error: state.posts.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPosts: () => dispatch(getAllPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/actions';
import PropTypes from 'prop-types';
import ErrorDisplay from '../common/ErrorDisplay';
import Loading from '../common/Loading';
import PostCard from './PostCard';
import Comments from './comments/Comments';

class SinglePost extends Component {
  componentWillMount() {
    this.props.getPost(this.props.slug);
  }

  render() {
    const title = this.props.post.title;
    return (
      <div>
        {
          !title && !this.props.error && <Loading />
        }
        {
          this.props.error &&
          <ErrorDisplay
            message={this.props.error}
          />
        }
        {
          title &&
          <PostCard post={this.props.post} />
        }
        {
          !this.props.error &&
          <Comments slug={this.props.slug} />
        }
      </div>
    );
  }
}

SinglePost.propTypes = {
  slug: PropTypes.string,
  post: PropTypes.object,
  error: PropTypes.string,
  getPost: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    post: state.posts.current,
    error: state.posts.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPost: slug => dispatch(getPost(slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);

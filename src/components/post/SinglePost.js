import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { getPost } from '../../actions/actions';
import PropTypes from 'prop-types';

class SinglePost extends Component {
  componentWillMount() {
    this.props.getPost(this.props.slug);
  }

  render() {
    return (
      <div>
        {
          this.props.error
          ?
          <p style={{color: 'red'}}>{this.props.error}</p>
          :
          <ReactMarkdown source={this.props.post.body} />
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

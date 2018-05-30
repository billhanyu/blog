import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost, getPost } from '../../actions/actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import EditPostForm from '../post/single/EditPostForm';
import ErrorDisplay from '../common/ErrorDisplay';
import Loading from '../common/Loading';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.submitted = false;
    this.slug = this.props.match.params.post;
    this.props.getPost(this.slug);
  }

  componentWillReceiveProps(newProps) {
    if (this.submitted && newProps.success) {
      this.props.history.replace(`/posts/${this.slug}`);
    }
  }

  onSubmit(title, body) {
    this.submitted = true;
    this.props.editPost(this.slug, title, body);
  }

  render() {
    if (this.props.error) {
      return <ErrorDisplay
        message={this.props.error}
      />;
    }
    if (!this.props.post.title) {
      return <Loading />;
    }
    return (
      <EditPostForm
        mode='edit'
        title={this.props.post.title}
        body={this.props.post.body}
        tagList={this.props.post.tagList}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.user,
    success: state.posts.edit.success,
    post: state.posts.current,
    error: state.posts.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editPost: (slug, title, body) => dispatch(editPost(slug, title, body)),
    getPost: slug => dispatch(getPost(slug)),
  };
};

EditPost.propTypes = {
  editPost: PropTypes.func,
  getPost: PropTypes.func,
  match: PropTypes.object,
  success: PropTypes.bool,
  history: PropTypes.object,
  post: PropTypes.object,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPost));

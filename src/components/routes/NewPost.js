import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitPost } from '../../actions/actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import EditPostForm from '../post/single/EditPostForm';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.submitted = false;
  }

  onSubmit(title, body, tagList) {
    this.submitted = true;
    this.props.submitPost(title, body, tagList);
  }

  componentWillReceiveProps(newProps) {
    if (this.submitted && newProps.success) {
      this.props.history.replace(`/posts/${newProps.slug}`);
    }
  }

  render() {
    return (
      <EditPostForm
        mode='new'
        title=''
        body=''
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.user,
    ...state.posts.new,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitPost: (title, body, tagList) => dispatch(submitPost(title, body, tagList)),
  };
};

NewPost.propTypes = {
  submitPost: PropTypes.func,
  success: PropTypes.bool,
  slug: PropTypes.string,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewPost));

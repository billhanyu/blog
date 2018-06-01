import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTagsAndPage } from '../../actions/actions';
import PropTypes from 'prop-types';
import Pagination from 'material-ui-pagination';
const { paginationDisplayCount } = require('../../config');

class PostPagination extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    this.props.updateTagsAndPage(this.props.tags.selected, page);
  }

  render() {
    return (
      <div
        style={{
          width: 500,
          margin: '0 auto',
        }}
      >
        <Pagination
          total={this.props.posts.pages}
          current={this.props.posts.page}
          display={paginationDisplayCount}
          onChange={this.changePage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: {
      ...state.posts,
    },
    tags: {
      ...state.tags,
    },
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTagsAndPage: (tags, page) => dispatch(updateTagsAndPage(tags, page)),
  };
};

PostPagination.propTypes = {
  updateTagsAndPage: PropTypes.func,
  posts: PropTypes.object,
  tags: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPagination);

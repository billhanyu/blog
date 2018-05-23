import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost } from '../../../actions/actions';
import { withRouter } from 'react-router-dom';

class ConfirmDeleteDialog extends Component {
  componentWillMount() {
    this.requested = false;
  }

  componentWillReceiveProps(newProps) {
    if (this.requested && newProps.success) {
      newProps.history.push('/');
    }
  }

  render() {
    const actions = [
      <Button
        key='cancel'
        color='primary'
        onClick={this.props.closeDialog}
      >Cancel</Button>,
      <Button
        key='delete'
        color='secondary'
        onClick={() => {
          this.requested = true;
          this.props.deletePost(this.props.slug);
          this.props.closeDialog();
        }}
      >Delete</Button>,
    ];

    return (
      <Dialog
        title="Confirm Deletion"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.closeDialog}
      >
        Are you sure you want to delete this post?
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    success: state.posts.delete.success,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deletePost: slug => dispatch(deletePost(slug)),
  };
};

ConfirmDeleteDialog.propTypes = {
  success: PropTypes.bool,
  slug: PropTypes.string,
  open: PropTypes.bool,
  closeDialog: PropTypes.func,
  deletePost: PropTypes.func,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConfirmDeleteDialog));

import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost } from '../../../actions/actions';
import { withRouter } from 'react-router-dom';

class ConfirmDeleteDialog extends Component {
  componentWillMount() {
    this.requested = false;
  }

  render() {
    const actions = [
      <FlatButton
        key='cancel'
        label="Cancel"
        primary={true}
        onClick={this.props.closeDialog}
      />,
      <FlatButton
        key='delete'
        label="Delete"
        secondary={true}
        onClick={() => {
          this.requested = true;
          this.props.deletePost(this.props.slug);
          this.props.closeDialog();
        }}
      />,
    ];

    if (this.requested && this.props.success) {
      this.props.history.push('/');
    }

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

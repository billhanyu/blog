import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.closeDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.closeDialog}
            color='primary'
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.requested = true;
              this.props.deletePost(this.props.slug);
              this.props.closeDialog();
            }}
          color='secondary'>
            Delete
          </Button>
        </DialogActions>
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

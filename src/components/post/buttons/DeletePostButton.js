import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import PropTypes from 'prop-types';

class DeletePostButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
    };
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    this.resetDeleteButtonClick = this.resetDeleteButtonClick.bind(this);
  }

  onDeleteButtonClick() {
    this.setState({
      dialogOpen: true,
    });
  }

  resetDeleteButtonClick() {
    this.setState({
      dialogOpen: false,
    });
  }

  render() {
    return (
      <div style={{display: 'inline-block'}}>
        <Button
          color='secondary'
          onClick={this.onDeleteButtonClick}
        >Delete</Button>
        <ConfirmDeleteDialog
          slug={this.props.slug}
          open={this.state.dialogOpen}
          closeDialog={this.resetDeleteButtonClick}
        />
      </div>
    );
  }
}

DeletePostButton.propTypes = {
  slug: PropTypes.string,
};

export default DeletePostButton;

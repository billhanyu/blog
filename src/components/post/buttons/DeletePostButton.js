import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
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
        <FlatButton
          secondary={true}
          label='Delete'
          onClick={this.onDeleteButtonClick}
        />
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

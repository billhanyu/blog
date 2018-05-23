import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class EditPostButton extends Component {
  render() {
    return (
      <Button
        color='primary'
        onClick={() => {
          this.props.history.push(`/editpost/${this.props.slug}`);
        }}
      >Edit</Button>
    );
  }
}

EditPostButton.propTypes = {
  slug: PropTypes.string,
  history: PropTypes.object,
};

export default withRouter(EditPostButton);

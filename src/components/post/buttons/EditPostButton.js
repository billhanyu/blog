import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class EditPostButton extends Component {
  render() {
    return (
      <FlatButton
        label='Edit'
        primary={true}
        onClick={() => {
          this.props.history.push(`/editPost/${this.props.slug}`);
        }}
      />
    );
  }
}

EditPostButton.propTypes = {
  slug: PropTypes.string,
  history: PropTypes.object,
};

export default withRouter(EditPostButton);

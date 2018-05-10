import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import PropTypes from 'prop-types';

class CommentItem extends Component {
  render() {
    const {
      body,
      author,
      createdAt,
    } = this.props.comment;

    const bottomText = `${author.name || author.email} at ${new Date(createdAt).toLocaleString()}`;
    return (
      <ListItem
        disabled={true}
        primaryText={body}
        secondaryText={bottomText}
      >
      </ListItem>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object,
};

export default CommentItem;

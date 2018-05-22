import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
const { baseURL } = require('../../../config');
import PropTypes from 'prop-types';
// import FlatButton from 'material-ui/FlatButton';

class ImageItem extends Component {
  constructor(props) {
    super(props);
    this.copyPath = this.copyPath.bind(this);
  }

  copyPath() {
  }

  render() {
    const url = `${baseURL}/${this.props.file}`;
    return (
      <ListItem disabled={true}>
        <img
          src={url}
          alt={this.props.file}
          width='300px'
          height='auto'
        />
        <p>{url}</p>
      </ListItem>
    );
  }
}

ImageItem.propTypes = {
  file: PropTypes.string,
};

export default ImageItem;

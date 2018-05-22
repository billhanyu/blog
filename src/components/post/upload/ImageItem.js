import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
const { baseURL } = require('../../../config');
import PropTypes from 'prop-types';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class ImageItem extends Component {
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
        <div>
          <CopyToClipboard text={url}
            onCopy={() => this.setState({ copied: true })}>
            <CopyIcon
              style={{cursor: 'pointer'}}
            />
          </CopyToClipboard>
          <span>{url}</span>
        </div>
      </ListItem>
    );
  }
}

ImageItem.propTypes = {
  file: PropTypes.string,
};

export default ImageItem;

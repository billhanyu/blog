import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
const { baseURL } = require('../../../config');
import PropTypes from 'prop-types';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { displayMessage } from '../../../actions/actions';
import { connect } from 'react-redux';

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
            onCopy={() => this.props.displayMessage('Copied to clipboard!')}>
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    displayMessage: message => dispatch(displayMessage(message)),
  };
};

ImageItem.propTypes = {
  file: PropTypes.string,
  displayMessage: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageItem);

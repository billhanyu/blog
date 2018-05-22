import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import ImageItem from './ImageItem';

class FileList extends Component {
  render() {
    return (
      <List>
        {
          this.props.files.map((file, idx) => {
            return (
              <ImageItem
                file={file}
                key={idx}
              />
            );
          })
        }
      </List>
    );
  }
}

FileList.propTypes = {
  files: PropTypes.array,
};

export default FileList;

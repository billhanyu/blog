import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import FileList from './FileList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { displayMessage } from '../../../actions/actions';
import axios from 'axios';
import { baseURL } from '../../../config';
const instance = axios.create({
  baseURL,
});

class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      progress: 0,
      uploading: false,
    };
    this.changeFile = this.changeFile.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.onUploadProgress = this.onUploadProgress.bind(this);
  }

  changeFile(e) {
    this.file = e.target.files[0];
  }

  onUploadProgress(progressEvent) {
    // progress is from 0 to 100
    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    this.setState({
      progress,
    });
  }

  onUpload() {
    if (!this.file) {
      this.props.displayMessage('You haven\'t selected any file yet!');
      return;
    }

    this.setState({
      uploading: true,
      progress: 0,
    });

    const data = new FormData();
    data.set('upload', this.file);
    instance.post('/uploads', data, {
      headers: { Authorization: 'Bearer ' + this.props.token },
      onUploadProgress: this.onUploadProgress,
    })
      .then(response => {
        const files = this.state.files.slice();
        files.push(response.data.path);
        this.setState({
          files,
          uploading: false,
        });
      })
      .catch(err => {
        this.props.displayMessage(err.response.data.message);
        this.setState({
          uploading: false,
        });
      });
  }

  render() {
    return (
      <div>
        <h3>Attachments</h3>
        <input type='file' onChange={this.changeFile} />
        <Button
          color='primary'
          onClick={this.onUpload}
        >Upload</Button>
        {
          this.state.uploading &&
          <LinearProgress variant='determinate' value={this.state.progress} />
        }
        <FileList files={this.state.files} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    displayMessage: message => dispatch(displayMessage(message)),
  };
};

UploadFiles.propTypes = {
  displayMessage: PropTypes.func,
  token: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFiles);

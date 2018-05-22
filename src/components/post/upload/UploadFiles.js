import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
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
    };
    this.changeFile = this.changeFile.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  changeFile(e) {
    this.file = e.target.files[0];
  }

  onUpload() {
    if (!this.file) {
      this.props.displayMessage('You haven\'t selected any file yet!');
      return;
    }

    const data = new FormData();
    data.set('upload', this.file);
    instance.post('/uploads', data, {
      headers: { Authorization: 'Bearer ' + this.props.token },
    })
      .then(response => {
        const files = this.state.files.slice();
        files.push(response.data.path);
        this.setState({
          files,
        });
        console.log(files);
      })
      .catch(err => {
        this.props.displayMessage(err.response.data.message);
      });
  }

  render() {
    return (
      <div>
        <h3>Attachments</h3>
        <input type='file' onChange={this.changeFile} />
        <FlatButton
          label='Upload'
          primary={true}
          onClick={this.onUpload}
        />
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

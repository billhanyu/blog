import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { centeredCard } from '../common/styles';
import TextField from 'material-ui/TextField';
import NavigationMenu from '../NavigationMenu';
import RaisedButton from 'material-ui/RaisedButton';
import Unauthorized from '../common/Unauthorized';
import UploadFiles from './upload/UploadFiles';

class EditPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      body: props.body,
      titleErrorText: '',
      bodyErrorText: '',
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeTitle(event) {
    this.setState({
      title: event.target.value,
      titleErrorText: '',
    });
  }

  onChangeBody(event) {
    this.setState({
      body: event.target.value,
      bodyErrorText: '',
    });
  }

  onSubmit() {
    const { title, body } = this.state;
    if (!title) {
      this.setState({
        titleErrorText: 'Title is required.',
      });
    }
    if (!body) {
      this.setState({
        bodyErrorText: 'Post body cannot be empty.',
      });
    }
    if (title && body) {
      this.props.onSubmit(title, body);
    }
  }

  render() {
    if (this.props.admin) {
      return (
        <div>
          <NavigationMenu selectedIndex={1} />
          <Card
            style={centeredCard}
          >
            <CardTitle
              title={this.props.mode === 'new' ? 'New Post' : 'Edit Post'}
              titleStyle={{
                fontWeight: 600,
                fontSize: 30,
              }}
            />
            <CardText>
              <TextField
                style={{
                  fontWeight: 400,
                  fontSize: 25,
                }}
                fullWidth={true}
                value={this.state.title}
                onChange={this.onChangeTitle}
                hintText='Post Title'
                errorText={this.state.titleErrorText}
              />
              <TextField
                fullWidth={true}
                multiLine={true}
                rows={15}
                value={this.state.body}
                onChange={this.onChangeBody}
                hintText='Post Body. Markdown is supported'
                errorText={this.state.bodyErrorText}
              />
              <RaisedButton
                label='Post'
                primary={true}
                onClick={this.onSubmit}
              />
              <div style={{height: 50}} />
              <UploadFiles />
            </CardText>
          </Card>
        </div>
      );
    } else {
      return <Unauthorized />;
    }
  }
}

const mapStateToProps = state => {
  return {
    ...state.user,
  };
};

EditPostForm.propTypes = {
  mode: PropTypes.oneOf(['new', 'edit']),
  title: PropTypes.string,
  body: PropTypes.string,
  onSubmit: PropTypes.func,
  admin: PropTypes.bool,
};

export default connect(mapStateToProps)(EditPostForm);

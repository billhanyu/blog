import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { centeredCard } from '../common/styles';
import TextField from 'material-ui/TextField';
import NavigationMenu from '../NavigationMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { submitPost } from '../../actions/actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      titleErrorText: '',
      bodyErrorText: '',
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.submitted = false;
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
      this.submitted = true;
      this.props.submitPost(title, body);
    }
  }

  render() {
    if (this.submitted && this.props.success) {
      this.props.history.replace(`/posts/${this.props.slug}`);
    }
    return (
      <div>
        <NavigationMenu selectedIndex={1} />
        <Card
          style={centeredCard}
        >
          <CardTitle
            title='New Post'
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
              primary={true}
              onClick={this.onSubmit}
            >
              Post
            </RaisedButton>
          </CardText>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    success: state.posts.new.success,
    slug: state.posts.new.slug,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitPost: (title, body) => dispatch(submitPost(title, body)),
  };
};

EditPost.propTypes = {
  submitPost: PropTypes.func,
  success: PropTypes.bool,
  slug: PropTypes.string,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPost));

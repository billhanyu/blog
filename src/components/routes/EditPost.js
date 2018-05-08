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
import Unauthorized from '../common/Unauthorized';

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
    if (this.props.admin) {
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
                label='Post'
                primary={true}
                onClick={this.onSubmit}
              />
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
  admin: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPost));

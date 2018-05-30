import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { centeredCard } from '../../common/styles';
import TextField from '@material-ui/core/TextField';
import NavigationMenu from '../../NavigationMenu';
import Button from '@material-ui/core/Button';
import Unauthorized from '../../common/Unauthorized';
import UploadFiles from './../upload/UploadFiles';
import EditTags from './tags/EditTags';
import { requestTags } from '../../../actions/actions';

class EditPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      body: props.body,
      tagList: props.tagList,
      titleErrorText: '',
      bodyErrorText: '',
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.requestTags();
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
            <CardHeader
              title={this.props.mode === 'new' ? 'New Post' : 'Edit Post'}
            />
            <CardContent>
              <TextField
                style={{
                  fontWeight: 400,
                  fontSize: 25,
                  marginBottom: 20,
                }}
                fullWidth={true}
                value={this.state.title}
                onChange={this.onChangeTitle}
                placeholder='Post Title'
                error={this.state.titleErrorText !== ''}
              />
              <EditTags
                tagList={this.props.tagList}
                all={this.props.all}
              />
              <TextField
                style={{
                  marginBottom: 20,
                }}
                fullWidth={true}
                multiline
                rows={25}
                value={this.state.body}
                onChange={this.onChangeBody}
                placeholder='Post Body. Markdown is supported'
                error={this.state.bodyErrorText !== ''}
              />
              <Button
                variant='raised'
                color='primary'
                onClick={this.onSubmit}
              >Post</Button>
              <div style={{height: 50}} />
              <UploadFiles />
            </CardContent>
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
    ...state.tags,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestTags: () => dispatch(requestTags()),
  };
};

EditPostForm.propTypes = {
  mode: PropTypes.oneOf(['new', 'edit']),
  title: PropTypes.string,
  body: PropTypes.string,
  tagList: PropTypes.array,
  onSubmit: PropTypes.func,
  admin: PropTypes.bool,
  requestTags: PropTypes.func,
  all: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPostForm);

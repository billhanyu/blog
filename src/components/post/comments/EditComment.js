import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postComment } from '../../../actions/actions';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class EditComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      errorText: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      body: event.target.value,
      errorText: '',
    });
  }

  onSubmit() {
    if (!this.state.body) {
      this.setState({
        errorText: 'You have to comment something',
      });
      return;
    }
    this.props.postComment(this.props.slug, this.state.body);
    this.setState({
      body: '',
    });
  }

  render() {
    return (
      <div>
        {
          !this.props.token &&
          <p>
            <a
              href='javascript:void(0)'
              onClick={() => this.props.history.push('/signup')}
            >Sign Up</a>
            <span> or </span>
            <a
              href='javascript:void(0)'
              onClick={() => this.props.history.push('/login')}
            >Log In</a>
            <span> to comment.</span>
          </p>
        }
        {
          this.props.token &&
          <div>
            <TextField
              value={this.state.body}
              onChange={this.onChange}
              errorText={this.state.errorText}
              fullWidth={true}
              hintText='Type some comment...'
              multiLine={true}
              rows={1}
              rowsMax={4}
            /><br />
            <RaisedButton
              label='Comment'
              style={{ float: 'right' }}
              primary={true}
              onClick={this.onSubmit}
            />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postComment: (slug, body) => dispatch(postComment(slug, body)),
  };
};

EditComment.propTypes = {
  history: PropTypes.object,
  slug: PropTypes.string,
  postComment: PropTypes.func,
  token: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditComment));
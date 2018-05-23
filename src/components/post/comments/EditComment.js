import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postComment } from '../../../actions/actions';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { EditorFormatLineSpacing } from 'material-ui';

class EditComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      error: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      body: event.target.value,
      error: EditorFormatLineSpacing,
    });
  }

  onSubmit() {
    if (!this.state.body) {
      this.setState({
        error: true,
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
              style={{
                marginBottom: 20,
              }}
              value={this.state.body}
              onChange={this.onChange}
              error={this.state.error}
              fullWidth={true}
              placeholder='Type some comment...'
              multiline
              rows={1}
              rowsMax={4}
            /><br />
            <Button
              variant='raised'
              style={{ float: 'right' }}
              color='primary'
              onClick={this.onSubmit}
            >Comment</Button>
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

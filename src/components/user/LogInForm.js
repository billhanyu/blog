import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const center = {
  margin: '0 auto',
  width: 400,
  display: 'block',
};

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      emailErrorText: '',
      passwordErrorText: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e, name) {
    const newState = Object.assign({}, this.state);
    newState[name] = e.target.value;
    this.setState({
      ...newState,
    });
    this.checkInput();
  }

  checkInput() {
    this.setState({
      emailErrorText: this.state.email ? '' : 'E-mail is required',
      passwordErrorText: this.state.password ? '' : 'Password is required',
    });
  }

  handleSubmit() {
    if (this.props.signup) {
      this.props.onSubmit(this.state.email, this.state.name, this.state.password);
    } else {
      this.props.onSubmit(this.state.email, this.state.password);
    }
  }

  render() {
    return (
      <div style={{marginTop: 40}}>
        <TextField
          hintText='lucy.zhang3@duke.edu'
          errorText={this.state.emailErrorText}
          floatingLabelText='E-Mail'
          onChange={e => this.handleTextChange(e, 'email')}
          style={center}
        /><br />
        {
          this.props.signup &&
          <div>
            <TextField
              hintText='Lucy Zhang'
              floatingLabelText='Name'
              onChange={e => this.handleTextChange(e, 'name')}
              style={center}
            /><br />
          </div>
        }
        <TextField
          hintText='password'
          type='password'
          errorText={this.state.passwordErrorText}
          floatingLabelText='Password'
          onChange={e => this.handleTextChange(e, 'password')}
          style={center}
        /><br />
        <div
          style={{
            ...center,
            height: 40,
          }}>
          <p style={{color: 'red'}}>
            {this.props.error}
          </p>
        </div>
        <Button
          variant='raised'
          color='primary'
          style={{ width: 200, margin: '0 auto', display: 'block' }}
          onClick={this.handleSubmit}
        >{this.props.signup ? 'Sign Up' : 'Log In'}</Button>
        <br /><br />
        {
          !this.props.signup &&
          <div style={center}>
            <span>Not a user?</span>
            <Button
              variant='raised'
              color='secondary'
              style={{ width: 100, marginLeft: 50, display: 'inline-block' }}
              onClick={() => {
                this.props.history.push('/signup');
              }}
            >Sign Up</Button>
          </div>
        }
      </div>
    );
  }
}

LogInForm.propTypes = {
  onSubmit: PropTypes.func,
  signup: PropTypes.bool,
  error: PropTypes.string,
  history: PropTypes.object,
};

export default withRouter(LogInForm);

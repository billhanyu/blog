import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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
          hintText='lucy.zhang@duke.edu'
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
        <RaisedButton
          label={this.props.signup ? 'Sign Up' : 'Log In'}
          primary={true}
          style={{ width: 200, margin: '0 auto', display: 'block' }}
          onClick={this.handleSubmit}
        /><br /><br />
        {
          !this.props.signup &&
          <div style={center}>
            <span>Not a user?</span>
            <RaisedButton
              label='Sign Up'
              secondary={true}
              style={{ width: 100, marginLeft: 50, display: 'inline-block' }}
              onClick={() => {
                this.props.history.push('/signup');
              }}
            />
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

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  width: {
    width: 400,
  },
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
    }, () =>this.checkInput());
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
    const { classes } = this.props;
    return (
      <div style={{marginTop: 40}} className={classes.container}>
        <TextField
          required
          placeholder='lucy.zhang3@duke.edu'
          error={this.state.emailErrorText !== ''}
          label='E-Mail'
          onChange={e => this.handleTextChange(e, 'email')}
          className={classes.width}
        />
        {
          this.props.signup &&
          <div>
            <TextField
              placeholder='Lucy Zhang'
              label='Name'
              onChange={e => this.handleTextChange(e, 'name')}
              className={classes.width}
            />
          </div>
        }
        <TextField
          required
          placeholder='password'
          type='password'
          error={this.state.passwordErrorText !== ''}
          label='Password'
          onChange={e => this.handleTextChange(e, 'password')}
          className={classes.width}
        />
        <div
          style={{
            height: 40,
          }}
          className={classes.width}
        >
          <p style={{color: 'red'}}>
            {this.props.error}
          </p>
        </div>
        <Button
          style={{width: 200}}
          variant='raised'
          color='primary'
          onClick={this.handleSubmit}
        >
          {this.props.signup ? 'Sign Up' : 'Log In'}
        </Button>
        <br /><br />
        {
          !this.props.signup &&
          <div>
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
  classes: PropTypes.object,
};

export default withStyles(styles)(withRouter(LogInForm));

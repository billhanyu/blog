import axios from 'axios';
import {
  SIGNUP,
  LOGIN,
} from './actionTypes';

export function signup(email, name, password) {
  return (dispatch, getState) => {
    axios.post('/user/signup', {
      email,
      name,
      password,
    })
      .then(response => {
        dispatch({ type: SIGNUP, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: SIGNUP, payload: { error: err.response.data.message } });
      });
  };
}

export function login(email, password) {
  return (dispatch, getState) => {
    axios.post('/user/login', {
      email,
      password,
    })
      .then(response => {
        dispatch({ type: LOGIN, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: LOGIN, payload: { error: err.response.data.message } });
      });
  };
}

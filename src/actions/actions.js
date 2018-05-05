import axios from 'axios';
import {
  SIGNUP,
  LOGIN,
  SINGLEPOST,
  ALLPOSTS,
} from './actionTypes';
const NETWORK_ERROR = 'Network Error';

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
        dispatch({ type: SIGNUP, payload: { error: err.response.data.message || NETWORK_ERROR } });
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
        dispatch({ type: LOGIN, payload: { error: err.response.data.message || NETWORK_ERROR } });
      });
  };
}

export function getPost(slug) {
  return (dispatch, getState) => {
    axios.get(`/posts/${slug}`)
      .then(response => {
        dispatch({ type: SINGLEPOST, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: SINGLEPOST, payload: { error: err.response.data.message || NETWORK_ERROR }});
      });
  };
}

export function getAllPosts() {
  return (dispatch, getState) => {
    axios.get('/posts', {
      params: {
        limit: Number.MAX_SAFE_INTEGER,
      },
    })
      .then(response => {
        dispatch({ type: ALLPOSTS, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: ALLPOSTS, payload: { error: err.response.data.message || NETWORK_ERROR } });
      });
  };
}

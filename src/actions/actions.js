import axios from 'axios';
import {
  SIGNUP,
  LOGIN,
  SINGLEPOST,
  REQUEST_ALL_POSTS,
  RECEIVE_ALL_POSTS,
  CLEAR_AUTH_ERROR,
  RECEIVE_COMMENTS,
  REQUEST_COMMENTS,
  POST_COMMENT,
  SUBMIT_POST_RESPONSE,
  SUBMIT_POST_REQUEST,
} from './actionTypes';
import { baseURL } from '../config';
const NETWORK_ERROR = 'Network Error';

const instance = axios.create({
  baseURL,
});

export function signup(email, name, password) {
  return (dispatch, getState) => {
    instance.post(`/user/signup`, {
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
    instance.post(`/user/login`, {
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

export function clearAuthError() {
  return { type: CLEAR_AUTH_ERROR };
}

export function getPost(slug) {
  return (dispatch, getState) => {
    instance.get(`/posts/${slug}`)
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
    dispatch({ type: REQUEST_ALL_POSTS, payload: {} });
    instance.get(`/posts`, {
      params: {
        limit: Number.MAX_SAFE_INTEGER,
      },
    })
      .then(response => {
        dispatch({ type: RECEIVE_ALL_POSTS, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: RECEIVE_ALL_POSTS, payload: { error: err.response.data.message || NETWORK_ERROR } });
      });
  };
}

export function getComments(slug) {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_COMMENTS });
    instance.get(`/posts/${slug}/comments`)
      .then(response => {
        dispatch({ type: RECEIVE_COMMENTS, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: RECEIVE_COMMENTS, payload: { error: err.response.data.message || NETWORK_ERROR } });
      });
  };
}

export function postComment(slug, body) {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_COMMENTS });
    instance.post(`/posts/${slug}/comments`, {
      body,
    }, {
      headers: { Authorization: 'Bearer ' + getState().user.token },
    })
      .then(response => {
        dispatch(getComments(slug));
      })
      .catch(err => {
        dispatch({ type: POST_COMMENT, payload: { error: err.response.data.message || NETWORK_ERROR } });
      });
  };
}

export function submitPost(title, body) {
  return (dispatch, getState) => {
    dispatch({ type: SUBMIT_POST_REQUEST });
    instance.post(`/posts`, {
      title,
      body,
    }, {
        headers: { Authorization: 'Bearer ' + getState().user.token },
      })
      .then(response => {
        dispatch({ type: SUBMIT_POST_RESPONSE, payload: { slug: response.data.slug }});
        dispatch(getPost(response.data.slug));
      })
      .catch(err => {
        dispatch({ type: SUBMIT_POST_RESPONSE, payload: { error: err.response.data.message || NETWORK_ERROR } });
      });
  };
}

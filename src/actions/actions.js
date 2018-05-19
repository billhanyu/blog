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
  RECEIVE_SUBMIT_POST,
  REQUEST_SUBMIT_POST,
  REQUEST_EDIT_POST,
  RECEIVE_EDIT_POST,
  RECEIVE_DELETE_POST,
  CLOSE_SNACKBAR,
  REQUEST_DELETE_POST,
  DISPLAY_MESSAGE,
  TOKEN_FROM_COOKIE,
  LOGOUT,
} from './actionTypes';
import { baseURL } from '../config';
const NETWORK_ERROR = 'Network Error';

const instance = axios.create({
  baseURL,
});

const getMessageFromErr = err => {
  return err.response && err.response.data
    ? err.response.data.message
    : null;
};

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
        dispatch({ type: SIGNUP, payload: { error: getMessageFromErr(err) || NETWORK_ERROR } });
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
        dispatch({ type: LOGIN, payload: { error: getMessageFromErr(err) || NETWORK_ERROR } });
      });
  };
}

export function logout() {
  return { type: LOGOUT };
}

export function tokenFromCookie(admin, token) {
  return {
    type: TOKEN_FROM_COOKIE,
    payload: {
      admin,
      token,
    },
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
        dispatch({ type: SINGLEPOST, payload: { error: getMessageFromErr(err) || NETWORK_ERROR }});
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
        dispatch({ type: RECEIVE_ALL_POSTS, payload: { error: getMessageFromErr(err) || NETWORK_ERROR } });
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
        dispatch({ type: RECEIVE_COMMENTS, payload: { error: getMessageFromErr(err) || NETWORK_ERROR } });
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
        dispatch({ type: POST_COMMENT, payload: { error: getMessageFromErr(err) || NETWORK_ERROR } });
      });
  };
}

export function submitPost(title, body) {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_SUBMIT_POST });
    instance.post(`/posts`, {
      title,
      body,
    }, {
        headers: { Authorization: 'Bearer ' + getState().user.token },
      })
      .then(response => {
        dispatch({ type: RECEIVE_SUBMIT_POST, payload: { slug: response.data.slug }});
        dispatch(getPost(response.data.slug));
      })
      .catch(err => {
        dispatch({ type: RECEIVE_SUBMIT_POST, payload: { error: getMessageFromErr(err) || NETWORK_ERROR } });
      });
  };
}

export function editPost(slug, title, body) {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_EDIT_POST });
    instance.put(`/posts/${slug}`, {
      title,
      body,
    }, {
        headers: { Authorization: 'Bearer ' + getState().user.token },
      })
      .then(response => {
        dispatch({ type: RECEIVE_EDIT_POST, payload: { slug: response.data.slug } });
        dispatch(getPost(response.data.slug));
      })
      .catch(err => {
        dispatch({ type: RECEIVE_EDIT_POST, payload: { error: getMessageFromErr(err) || NETWORK_ERROR } });
      });
  };
}

export function deletePost(slug) {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_DELETE_POST });
    instance.delete(`/posts/${slug}`, {
      headers: { Authorization: 'Bearer ' + getState().user.token },
    })
      .then(response => {
        dispatch(displayMessage('Post Deleted'));
        dispatch({ type: RECEIVE_DELETE_POST, payload: {} });
      })
      .catch(err => {
        dispatch({ type: RECEIVE_DELETE_POST, payload: { error: getMessageFromErr(err) || NETWORK_ERROR }});
      });
  };
}

export function closeSnackBar() {
  return { type: CLOSE_SNACKBAR };
}

export function displayMessage(message) {
  return { type: DISPLAY_MESSAGE, payload: { message }};
}

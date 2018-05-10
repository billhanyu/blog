import {
  SINGLEPOST,
  REQUEST_ALL_POSTS,
  RECEIVE_ALL_POSTS,
  RECEIVE_SUBMIT_POST,
  REQUEST_SUBMIT_POST,
  REQUEST_DELETE_POST,
  RECEIVE_DELETE_POST,
} from '../actions/actionTypes';

function posts(state={
  current: {},
  all: [],
  new: {
    slug: '',
    success: false,
  },
  delete: {
    success: false,
  },
}, action) {
  switch (action.type) {
    case SINGLEPOST:
      return {
        ...state,
        current: action.payload.post || {},
        error: action.payload.error,
      };
    case REQUEST_ALL_POSTS:
      return {
        ...state,
        ready: false,
        error: '',
      };
    case RECEIVE_ALL_POSTS:
      return {
        ...state,
        all: action.payload.posts || [],
        ready: true,
        error: action.payload.error,
      };
    case REQUEST_SUBMIT_POST:
      return {
        ...state,
        new: {
          success: false,
        },
      };
    case RECEIVE_SUBMIT_POST:
      return {
        ...state,
        new: {
          slug: action.payload.slug,
          success: !action.payload.error,
        },
      };
    case REQUEST_DELETE_POST:
      return {
        ...state,
        delete: {
          success: false,
        },
      };
    case RECEIVE_DELETE_POST:
      return {
        ...state,
        delete: {
          success: !action.payload.error,
        },
      };
    default:
      return state;
  }
}

export default posts;

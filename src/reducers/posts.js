import {
  SINGLEPOST,
  REQUEST_ALL_POSTS,
  RECEIVE_ALL_POSTS,
  SUBMIT_POST_RESPONSE,
  SUBMIT_POST_REQUEST,
} from '../actions/actionTypes';

function posts(state={
  current: {},
  all: [],
  new: {
    success: false,
    error: '',
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
    case SUBMIT_POST_REQUEST:
      return {
        ...state,
        new: {
          success: false,
          error: '',
        },
      };
    case SUBMIT_POST_RESPONSE:
      return {
        ...state,
        new: {
          slug: action.payload.slug,
          success: !action.payload.error,
          error: action.payload.error,
        },
      };
    default:
      return state;
  }
}

export default posts;

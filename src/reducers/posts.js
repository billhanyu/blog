import {
  SINGLEPOST,
  REQUEST_ALL_POSTS,
  RECEIVE_ALL_POSTS,
} from '../actions/actionTypes';

function posts(state={
  current: {},
  all: [],
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
    default:
      return state;
  }
}

export default posts;

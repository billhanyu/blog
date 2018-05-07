import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
} from '../actions/actionTypes';

function comments(state={
  all: [],
  error: '',
}, action) {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return {
        all: [],
        error: '',
      };
    case RECEIVE_COMMENTS:
      return {
        ...state,
        all: action.payload.comments,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default comments;

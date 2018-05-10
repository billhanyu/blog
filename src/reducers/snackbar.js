import {
  DELETE_POST,
  RECEIVE_SUBMIT_POST,
  POST_COMMENT,
  CLOSE_SNACKBAR,
  DISPLAY_MESSAGE,
} from '../actions/actionTypes';

function snackbar(state={
  message: '',
}, action) {
  switch (action.type) {
    case DELETE_POST:
    case RECEIVE_SUBMIT_POST:
    case POST_COMMENT:
      return {
        message: action.payload.error || '',
      };
    case DISPLAY_MESSAGE:
      return {
        message: action.payload.message || '',
      };
    case CLOSE_SNACKBAR:
      return {
        message: '',
      };
    default:
      return state;
  }
}

export default snackbar;

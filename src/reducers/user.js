import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  CLEAR_AUTH_ERROR,
} from '../actions/actionTypes';

function user(state={}, action) {
  switch (action.type) {
    case SIGNUP:
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        error: action.payload.error,
      };
    case LOGOUT:
      return {
        ...state,
        token: '',
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
}

export default user;

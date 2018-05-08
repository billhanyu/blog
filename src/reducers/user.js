import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  CLEAR_AUTH_ERROR,
} from '../actions/actionTypes';

function user(state={
  admin: false,
  token: '',
}, action) {
  switch (action.type) {
    case SIGNUP:
    case LOGIN:
      return {
        ...state,
        admin: action.payload.admin,
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

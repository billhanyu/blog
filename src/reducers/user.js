import {
  SIGNUP,
  LOGIN,
  LOGOUT,
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
    default:
      return state;
  }
}

export default user;

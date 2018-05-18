import {
  SIGNUP,
  LOGIN,
  TOKEN_FROM_COOKIE,
  LOGOUT,
  CLEAR_AUTH_ERROR,
} from '../actions/actionTypes';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function user(state={
  admin: false,
  token: '',
}, action) {
  switch (action.type) {
    case SIGNUP:
    case LOGIN:
      {
        const { admin, token, error } = action.payload;
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        cookies.set('admin', admin, { path: '/', expires: expiry });
        cookies.set('token', token, { path: '/', expires: expiry });
        return {
          ...state,
          admin,
          token,
          error,
        };
      }
    case TOKEN_FROM_COOKIE:
      {
        const token = action.payload.token;
        const admin = action.payload.admin === 'true';
        return {
          ...state,
          admin,
          token,
        };
      }
    case LOGOUT:
      cookies.set('admin', '', { path: '/' });
      cookies.set('token', '', { path: '/' });
      return {
        ...state,
        admin: false,
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

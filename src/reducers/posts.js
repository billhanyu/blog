import {
  SINGLEPOST,
  REQUEST_ALL_POSTS,
  RECEIVE_ALL_POSTS,
  RECEIVE_SUBMIT_POST,
  REQUEST_SUBMIT_POST,
  REQUEST_DELETE_POST,
  RECEIVE_DELETE_POST,
  REQUEST_EDIT_POST,
  RECEIVE_EDIT_POST,
  UPDATE_PAGE,
} from '../actions/actionTypes';

function posts(state={
  current: {},
  all: [],
  page: 1,
  pages: 1,
  new: {
    slug: '',
    success: false,
  },
  edit: {
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
        pages: action.payload.pages || 1,
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
    case REQUEST_EDIT_POST:
      return {
        ...state,
        edit: {
          success: false,
        },
      };
    case RECEIVE_EDIT_POST:
      return {
        ...state,
        edit: {
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
        all: state.all.filter(post => post.slug !== action.payload.slug).slice(),
        delete: {
          success: !action.payload.error,
        },
      };
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}

export default posts;

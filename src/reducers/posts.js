import {
  SINGLEPOST,
  ALLPOSTS,
} from '../actions/actionTypes';

function posts(state={
  current: {},
  all: [],
}, action) {
  switch (action.type) {
    case SINGLEPOST:
      return {
        ...state,
        current: action.payload,
        error: action.payload.error,
      };
    case ALLPOSTS:
      return {
        ...state,
        all: action.payload,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default posts;

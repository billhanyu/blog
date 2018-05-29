import { RECEIVE_TAGS } from '../actions/actionTypes';

function tags(state={
  all: [],
  selected: [],
}, action) {
  switch (action.type) {
    case RECEIVE_TAGS:
      return {
        ...state,
        all: action.payload.tags,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default tags;

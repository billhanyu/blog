import {
  RECEIVE_TAGS,
  UPDATE_FILTER_TAGS,
} from '../actions/actionTypes';

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
    case UPDATE_FILTER_TAGS:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
}

export default tags;

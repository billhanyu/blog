import { combineReducers } from 'redux';
import user from './user';
import posts from './posts';
import comments from './comments';
import snackbar from './snackbar';

export default combineReducers({
  user,
  posts,
  comments,
  snackbar,
});

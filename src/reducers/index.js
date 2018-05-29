import { combineReducers } from 'redux';
import user from './user';
import posts from './posts';
import comments from './comments';
import snackbar from './snackbar';
import tags from './tags';

export default combineReducers({
  user,
  posts,
  comments,
  snackbar,
  tags,
});

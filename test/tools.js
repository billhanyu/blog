const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

const injectUser = (email, name, password, admin) => {
  const user = new User({
    email,
    name,
    admin: admin === true,
  });
  user.setPassword(password);
  return user.save();
};

const injectPost = (title, body, tagList, author) => {
  const post = new Post({
    title,
    body,
    tagList,
    author,
  });
  return post.save();
};

const injectComment = (body, author, post) => {
  const comment = new Comment({
    body,
    post,
    author,
  });
  post.comments.push(comment._id);
  return Promise.all([comment.save(), post.save()]);
};

module.exports = {
  injectUser,
  injectPost,
  injectComment,
};

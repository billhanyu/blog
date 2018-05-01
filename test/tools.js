const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

const injectUser = (email, name, password, admin) => {
  const user = new User({
    email,
    name,
    admin: admin === true,
  });
  user.setPassword(password);
  return user.save();
};

const injectPost = (title, body, tagList, user) => {
  const post = new Post({
    title,
    body,
    tagList,
    author: user,
  });
  return post.save();
};

module.exports = {
  injectUser,
  injectPost,
};

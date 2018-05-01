const mongoose = require('mongoose');
const User = mongoose.model('User');

function adminRequired(req, res, next) {
  return userQuery(req, res, next, true);
}

function noobRequired(req, res, next) {
  return userQuery(req, res, next, false);
}

// req.user can be null
function noneRequired(req, res, next) {
  if (!req.payload) {
    return next();
  }
  User.findById(req.payload._id).exec()
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
}

function userQuery(req, res, next, admin) {
  User.findById(req.payload._id).exec()
    .then(user => {
      if (!user) {
        return res.status(401).send('Please log in first');
      }
      if (admin && !user.admin) {
        return res.status(401).send('This action requires admin access');
      }
      req.user = user;
      next();
    })
    .catch(next);
}

module.exports = {
  noneRequired,
  adminRequired,
  noobRequired,
};

const credentials = require('./getCredentials')();
const jwt = require('express-jwt');
const { adminRequired, noobRequired, noneRequired } = require('./authMiddleware');
const auth = jwt({
  secret: credentials.secret,
  userProperty: 'payload',
});

module.exports = {
  none: [auth, noneRequired],
  admin: [auth, adminRequired],
  noob: [auth, noobRequired],
};

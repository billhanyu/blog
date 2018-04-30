const credentials = require('./getCredentials')();
const jwt = require('express-jwt');
const { adminRequired, noobRequired } = require('./authMiddleware');
const auth = jwt({
  secret: credentials.secret,
  userProperty: 'payload',
});

module.exports = {
  admin: [auth, adminRequired],
  noob: [auth, noobRequired],
};

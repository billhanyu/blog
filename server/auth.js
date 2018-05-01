const credentials = require('./getCredentials')();
const jwt = require('express-jwt');
const { adminRequired, noobRequired, noneRequired } = require('./authMiddleware');
const auth = jwt({
  secret: credentials.secret,
  userProperty: 'payload',
});
const optional = jwt({
  secret: credentials.secret,
  userProperty: 'payload',
  credentialsRequired: false,
});

module.exports = {
  none: [optional, noneRequired],
  admin: [auth, adminRequired],
  noob: [auth, noobRequired],
};

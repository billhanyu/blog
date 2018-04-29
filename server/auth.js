const credentials = require('./getCredentials')();
const jwt = require('express-jwt');
const auth = jwt({
  secret: credentials.secret,
  userProperty: 'payload',
});

module.exports = auth;

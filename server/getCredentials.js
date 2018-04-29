module.exports = function getCredentials() {
  let credentials;
  try {
    credentials = require('./credentials');
  } catch (e) {
    credentials = require('./credentials.example');
  }
  return credentials;
};

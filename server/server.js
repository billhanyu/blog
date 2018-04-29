const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./models/users');
require('./passport');
const user = require('./routes/user');

// mongo init
let url = process.env.MONGO_URL || 'mongodb://localhost:27017/blog';
const mongoose = require('mongoose');
mongoose.connect(url);

// passport + auth
const credentials = require('./getCredentials')();
const jwt = require('express-jwt');
const auth = jwt({
  secret: credentials.secret,
  userProperty: 'payload',
});

// nodemailer init
const nodemailer = process.env.NODE_ENV === 'test' ? require('nodemailer-mock') : require('nodemailer');
global.transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail',
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.post('/signup', user.signup);
// format is Authorization: Bearer [token]
app.get('/profile', auth, user.profile);

// error handlers
// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ 'message': err.name + ': ' + err.message });
  }
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const port = 1717;
app.listen(port, () => {
    console.log(`Blog app listening on ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

// nodemailer init
const nodemailer = isTest ? require('nodemailer-mock') : require('nodemailer');
global.transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail',
});

// mongodb models
require('./models/User');
require('./models/Post');
require('./models/Comment');
require('./passport');

// mongo init
let url = process.env.MONGO_URL || 'mongodb://localhost:27017/blog';
const mongoose = require('mongoose');
mongoose.connect(url);

// express app config
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// api routes
app.use(require('./api'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers for app
// error format: { message } as the body returned
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
} else {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {},
    });
  });
}

const port = 1717;
if (!isTest) {
  app.listen(port, async () => {
    console.log(`Blog app listening on ${port}`);
  });
}

// for testing
module.exports = app;

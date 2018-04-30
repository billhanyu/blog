const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const credentials = require('../getCredentials')();
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'can\'t be blank'],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    index: true,
  },
  name: {
    type: String,
    index: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  hash: String,
  salt: String,
});

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, credentials.secret);
};

UserSchema.methods.toProfileJSON = function() {
  return {
    email: this.email,
    name: this.name,
    admin: this.admin,
  };
};

UserSchema.methods.like = function(postId) {
  if (this.likes.indexOf(postId) === -1) {
    this.likes.push(postId);
  }
  return this.save();
};

UserSchema.methods.unfavorite = function(postId) {
  this.likes.remove(postId);
  return this.save();
};

UserSchema.methods.isFavorite = function(postId) {
  return this.likes.some(function(likeId) {
    return likeId.toString() === postId.toString();
  });
};

mongoose.model('User', UserSchema);

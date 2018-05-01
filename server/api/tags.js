const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const auth = require('../auth');

// return a list of tags
router.get('/', auth.none, (req, res, next) => {
  Post.distinct('tagList').then(tags => {
    return res.json(tags);
  }).catch(next);
});

module.exports = router;

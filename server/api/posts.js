const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const express = require('express');
const router = new express.Router();
const auth = require('../auth');

router.param('post', (req, res, next, slug) => {
  Post.findOne({slug}).populate('author').exec()
    .then(post => {
      if (!post) {
        return res.sendStatus(404);
      }
      req.post = post;
      next();
    })
    .catch(next);
});

router.param('comment', (req, res, next, id) => {
  Comment.findById(id).exec()
    .then(comment => {
      if (!comment) {
        return res.sendStatus(404);
      }
      req.comment = comment;
      next();
    })
    .catch(next);
});

// get posts
// query params: limit, offset, tagList
router.get('/', (req, res, next) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset || 0;
  const query = {};
  if (req.query.tagList) {
    const tagList = JSON.parse(req.query.tagList);
    query.tagList = { '$in': tagList };
  }

  Promise.all([
    Post.find(query)
      .skip(Number(offset))
      .limit(Number(limit))
      .sort({ createdAt: 'desc' })
      .populate('author')
      .exec(),
    req.payload ? User.findById(req.payload._id) : null,
  ])
    .then(results => {
      const posts = results[0];
      const user = results[1];
      res.json(posts.map(post => post.toJSONFor(user)));
    })
    .catch(next);
});

// get one post
router.get('/:post', (req, res, next) => {
  res.json(req.post.toJSONFor(null));
});

// post a blog post
router.post('/', auth.admin, (req, res, next) => {
  const { title, body, tagList } = req.body;
  if (!title) {
    return res.status(422).send('Post needs a title');
  }
  const post = new Post({
    title,
    body,
    tagList,
    author: req.user,
  });
  post.save()
    .then(() => res.sendStatus(200))
    .catch(next);
});

// update a blog post
router.put('/:post', auth.admin, (req, res, next) => {

});

// delete a blog post
router.delete('/:post', auth.admin, (req, res, next) => {

});

// like a post
router.post('/:post/like', auth.noob, (req, res, next) => {

});

// unlike a post
router.delete('/:post/like', auth.noob, (req, res, next) => {

});

// post a comment
router.post('/:post/comments', auth.noob, (req, res, next) => {

});

// update a comment
router.put('/:post/comments/:comment', auth.noob, (req, res, next) => {

});

// delete a comment
router.delete('/:post/comments/:comment', auth.noob, (req, res, next) => {

});

module.exports = router;

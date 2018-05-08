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
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.sendStatus(404);
  }

  Comment.findById(id).populate('author').exec()
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
router.get('/', auth.none, (req, res, next) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset || 0;
  const query = {};
  if (req.query.tagList) {
    const tagList = JSON.parse(req.query.tagList);
    query.tagList = { '$in': tagList };
  }

  Post.find(query)
    .skip(Number(offset))
    .limit(Number(limit))
    .sort({ createdAt: 'desc' })
    .populate('author')
    .exec()
    .then(posts => {
      res.json({
        posts: posts.map(post => post.toJSONFor(req.user)),
      });
    })
    .catch(next);
});

// get one post
router.get('/:post', auth.none, (req, res, next) => {
  res.json({
    post: req.post.toJSONFor(req.user),
  });
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
    .then((saved) => res.json(saved.toJSONFor(req.user)))
    .catch(next);
});

// update a blog post
router.put('/:post', auth.admin, (req, res, next) => {
  const { title, body, tagList } = req.body;
  if (!title) {
    return res.status(422).send('Post needs a title');
  }
  const post = req.post;
  post.title = title;
  post.body = body;
  post.tagList = tagList;
  post.save()
    .then(() => res.sendStatus(200))
    .catch(next);
});

// delete a blog post
router.delete('/:post', auth.admin, (req, res, next) => {
  req.post.remove()
    .then(() => res.sendStatus(200))
    .catch(next);
});

// like a post
router.post('/:post/like', auth.noob, (req, res, next) => {
  req.user.like(req.post._id)
    .then(() => req.post.updateLikes())
    .then(() => res.sendStatus(200))
    .catch(next);
});

// unlike a post
router.delete('/:post/like', auth.noob, (req, res, next) => {
  req.user.unlike(req.post._id)
    .then(() => req.post.updateLikes())
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.get('/:post/comments', auth.none, (req, res, next) => {
  Promise.all(req.post.comments.map(commentId => {
    return Comment.findById(commentId)
      .populate('author')
      .sort({ createdAt: 'asc' })
      .exec();
  }))
    .then(results => {
      return res.json({
        comments: results.map(comment => comment.toJSON()),
      });
    })
    .catch(next);
});

// post a comment
router.post('/:post/comments', auth.noob, (req, res, next) => {
  const body = req.body.body;
  if (!body) {
    return res.status(422).send('Comment cannot be empty');
  }
  const comment = new Comment({
    body,
    author: req.user,
    post: req.post,
  });
  comment.save()
    .then(saved => {
      req.post.comments.push(saved);
      return req.post.save();
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});

// update a comment
router.put('/:post/comments/:comment', auth.noob, (req, res, next) => {
  const body = req.body.body;
  if (req.comment.author._id.toString() !== req.user._id.toString() && !req.user.admin) {
    return res.sendStatus(403);
  }
  if (!body) {
    return res.status(422).send('Comment cannot be empty');
  }
  req.comment.body = body;
  req.comment.save()
    .then(() => res.sendStatus(200))
    .catch(next);
});

// delete a comment
router.delete('/:post/comments/:comment', auth.noob, (req, res, next) => {
  if (req.comment.author._id.toString() !== req.user._id.toString() && !req.user.admin) {
    return res.sendStatus(403);
  }
  req.post.comments.remove(req.comment._id);
  req.post.save()
    .then(() => req.comment.remove())
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;

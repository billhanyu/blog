const { injectUser, injectPost, injectComment } = require('./tools');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');

describe('comments', () => {
  let lucy;
  let adminToken;
  let bill;
  let noobToken;
  let eric;
  let uselessToken;
  let firstPost;

  before((done) => {
    injectUser('lucy.zhang@duke.edu', 'Lucy Zhang', 'password', true)
      .then(saved => {
        lucy = saved;
        adminToken = lucy.generateJwt();
        return injectUser('han.yu@duke.edu', 'Bill Yu', 'password', false);
      })
      .then(saved => {
        bill = saved;
        noobToken = bill.generateJwt();
        return injectUser('eric.s.song@duke.edu', 'Eric Song', 'password', false);
      })
      .then(saved => {
        eric = saved;
        uselessToken = eric.generateJwt();
        return injectPost('title', 'body', ['tag1', 'tag2'], lucy);
      })
      .then(first => {
        firstPost = first;
        done();
      })
      .catch(done);
  });

  const clearComments = done => {
    Post.findById(firstPost._id).exec()
      .then(post => {
        post.comments = [];
        const removes = [Comment.deleteMany({}).exec(), post.save()];
        return Promise.all(removes);
      })
      .then((saved) => {
        firstPost = saved[1];
        done();
      })
      .catch(done);
  };

  after(() => {
    return Promise.all([
      User.deleteMany({}).exec(),
      Post.deleteMany({}).exec(),
      Comment.deleteMany({}).exec(),
    ]);
  });

  describe('GET /posts/:post/comments', () => {
    before((done) => {
      injectComment('comment', lucy, firstPost)
        .then(() => injectComment('comment2', bill, firstPost))
        .then(() => Post.findById(firstPost._id).exec())
        .then(update => {
          firstPost = update;
          done();
        })
        .catch(done);
    });

    after(clearComments);

    it('should return all comments for a post', done => {
      chai.request(server)
        .get(`/posts/${firstPost.slug}/comments`)
        .end((err, res) => {
          res.should.have.status(200);
          const comments = res.body.comments;
          assert.equal(comments.length, 2);
          assert.equal(comments[0].body, 'comment');
          assert.equal(comments[0].author.name, 'Lucy Zhang');
          assert.equal(comments[1].body, 'comment2');
          assert.equal(comments[1].author.name, 'Bill Yu');
          done();
        });
    });
  });

  describe('POST /posts/:post/comments', () => {
    beforeEach(clearComments);

    it('should allow noobs to post comment', done => {
      chai.request(server)
        .post(`/posts/${firstPost.slug}/comments`)
        .set({ Authorization: 'Bearer ' + noobToken })
        .send({
          body: 'comment',
        })
        .end((err, res) => {
          res.should.have.status(200);
          Promise.all([
            Post.findById(firstPost._id).exec(),
            Comment.find().exec(),
          ])
            .then(results => {
              const post = results[0];
              const comments = results[1];
              assert.equal(post.comments.length, 1);
              assert.equal(comments.length, 1);
              assert.equal(comments[0].body, 'comment');
              assert.equal(comments[0].author.toString(), bill._id.toString());
              done();
            })
            .catch(done);
        });
    });

    it('should reject empty comment', done => {
      chai.request(server)
        .post(`/posts/${firstPost.slug}/comments`)
        .set({ Authorization: 'Bearer ' + noobToken })
        .send({
          body: '',
        })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('should reject non logged in users to post comment', done => {
      chai.request(server)
        .post(`/posts/${firstPost.slug}/comments`)
        .send({
          body: 'comment',
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('PUT /posts/:post/comments', () => {
    let comment;

    before(done => {
      injectComment('comment', bill, firstPost)
        .then(saved => {
          comment = saved[0];
          done();
        })
        .catch(done);
    });

    after(clearComments);

    it('should allow admin to edit comments', done => {
      chai.request(server)
        .put(`/posts/${firstPost.slug}/comments/${comment._id}`)
        .set({ Authorization: 'Bearer ' + adminToken })
        .send({
          body: 'comment1',
        })
        .end((err, res) => {
          res.should.have.status(200);
          Comment.findById(comment._id).exec()
            .then(comment => {
              assert.equal(comment.body, 'comment1');
              assert.equal(comment.author.toString(), bill._id.toString());
              done();
            })
            .catch(done);
        });
    });

    it('should allow noob to edit comments', done => {
      chai.request(server)
        .put(`/posts/${firstPost.slug}/comments/${comment._id}`)
        .set({ Authorization: 'Bearer ' + noobToken })
        .send({
          body: 'comment1',
        })
        .end((err, res) => {
          res.should.have.status(200);
          Comment.findById(comment._id).exec()
            .then(comment => {
              assert.equal(comment.body, 'comment1');
              assert.equal(comment.author.toString(), bill._id.toString());
              done();
            })
            .catch(done);
        });
    });

    it('should disallow noob to edit comments not theirs', done => {
      chai.request(server)
        .put(`/posts/${firstPost.slug}/comments/${comment._id}`)
        .set({ Authorization: 'Bearer ' + uselessToken })
        .send({
          body: 'comment1',
        })
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });

    it('should 404 for invalid comment id', done => {
      chai.request(server)
        .put(`/posts/${firstPost.slug}/comments/bluh`)
        .set({ Authorization: 'Bearer ' + adminToken })
        .send({
          body: 'comment1',
        })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('should 404 for unknown comment', done => {
      chai.request(server)
        .put(`/posts/${firstPost.slug}/comments/${firstPost._id}`)
        .set({ Authorization: 'Bearer ' + adminToken })
        .send({
          body: 'comment1',
        })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('DELETE /posts/:post/comments', () => {
    let comment;

    beforeEach(done => {
      injectComment('comment', bill, firstPost)
        .then(saved => {
          comment = saved[0];
          done();
        })
        .catch(done);
    });

    afterEach(clearComments);

    it('should allow admin to delete comments', done => {
      chai.request(server)
        .delete(`/posts/${firstPost.slug}/comments/${comment._id}`)
        .set({ Authorization: 'Bearer ' + adminToken })
        .end((err, res) => {
          res.should.have.status(200);
          Promise.all([Comment.find().exec(), Post.findById(firstPost._id).exec()])
            .then(results => {
              const comments = results[0];
              const post = results[1];
              assert.equal(comments.length, 0);
              assert.equal(post.comments.length, 0);
              done();
            })
            .catch(done);
        });
    });

    it('should allow authors to delete comments', done => {
      chai.request(server)
        .delete(`/posts/${firstPost.slug}/comments/${comment._id}`)
        .set({ Authorization: 'Bearer ' + noobToken })
        .end((err, res) => {
          res.should.have.status(200);
          Promise.all([Comment.find().exec(), Post.findById(firstPost._id).exec()])
            .then(results => {
              const comments = results[0];
              const post = results[1];
              assert.equal(comments.length, 0);
              assert.equal(post.comments.length, 0);
              done();
            })
            .catch(done);
        });
    });

    it('should reject other noobs to delete comments', done => {
      chai.request(server)
        .delete(`/posts/${firstPost.slug}/comments/${comment._id}`)
        .set({ Authorization: 'Bearer ' + uselessToken })
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
});

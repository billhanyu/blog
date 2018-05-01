const { injectUser, injectPost } = require('./tools');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

describe('posts', () => {
  let lucy;
  let adminToken;
  let bill;
  let noobToken;

  before((done) => {
    injectUser('lucy.zhang@duke.edu', 'Lucy Zhang', 'password', true)
      .then(saved => {
        lucy = saved;
        adminToken = lucy.generateJwt();
        return injectUser('han.yu@duke.edu', 'Bill Yu', 'password', false);
      })
      .then((saved) => {
        bill = saved;
        noobToken = bill.generateJwt();
        done();
      })
      .catch(done);
  });

  describe('GET posts/', () => {
    let firstPost;

    before(done => {
      injectPost('title', 'body', ['tag1', 'tag2'], lucy)
        .then((first) => {
          firstPost = first;
          return injectPost('title1', 'body', ['tag1'], lucy);
        })
        .then(() => lucy.like(firstPost._id))
        .then(() => {
          done();
        })
        .catch(done);
    });

    it('should be able to view all posts', done => {
      chai.request(server)
        .get('/posts')
        .set({ Authorization: 'Bearer ' + adminToken })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.length, 2);
          assert.equal(res.body[1].liked, true);
          done();
        });
    });

    it('should be able to filter by tags', done => {
      chai.request(server)
        .get('/posts')
        .query({ tagList: JSON.stringify(['tag2']) })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.length, 1);
          assert.equal(res.body[0].title, 'title');
          done();
        });
    });

    it('should be able to set an offset', done => {
      chai.request(server)
        .get('/posts')
        .query({ offset: 1 })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.length, 1);
          // order by descending, so the first one added is here
          assert.equal(res.body[0].title, 'title');
          done();
        });
    });

    it('should be able to set a limit', done => {
      chai.request(server)
        .get('/posts')
        .query({ limit: 1 })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.length, 1);
          assert.equal(res.body[0].title, 'title1');
          done();
        });
    });

    it('should be able to view a single post', done => {
      chai.request(server)
        .get(`/posts/${firstPost.slug}`)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.title, 'title');
          assert.equal(res.body.liked, false);
          done();
        });
    });

    it('should show liked for liked posts', done => {
      chai.request(server)
        .get(`/posts/${firstPost.slug}`)
        .set({ Authorization: 'Bearer ' + adminToken })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.title, 'title');
          assert.equal(res.body.liked, true);
          done();
        });
    });

    it('should 404 for nonexistent post', done => {
      chai.request(server)
        .get('/posts/somerandompost')
        .set({ Authorization: 'Bearer ' + adminToken })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('POST /posts', () => {
    before(done => {
      Post.deleteMany({}).exec()
        .then(() => {
          done();
        })
        .catch(done);
    });

    it('should allow admin to post', done => {
      chai.request(server)
        .post('/posts')
        .set({ Authorization: 'Bearer ' + adminToken })
        .send({
          title: 'title2',
          body: 'body',
          tagList: ['tag3', 'tag4'],
        })
        .end((err, res) => {
          res.should.have.status(200);
          Post.find().exec()
            .then(posts => {
              assert.equal(posts.length, 1);
              assert.equal(posts[0].title, 'title2');
            });
          done();
        });
    });

    it('should reject no title', done => {
      chai.request(server)
        .post('/posts')
        .set({ Authorization: 'Bearer ' + adminToken })
        .send({
          title: '',
          body: 'body',
          tagList: ['tag3', 'tag4'],
        })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('should reject noobs', done => {
      chai.request(server)
        .post('/posts')
        .send({
          title: 'title',
          body: 'body',
          tagList: ['tag3', 'tag4'],
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('PUT /posts', () => {
    let firstPost;

    before(done => {
      Post.deleteMany({}).exec()
        .then(() => injectPost('title', 'body', ['tag1', 'tag2'], lucy))
        .then((first) => {
          firstPost = first;
          done();
        })
        .catch(done);
    });

    it('should allow admin to update post', done => {
      chai.request(server)
        .put(`/posts/${firstPost.slug}`)
        .set({ Authorization: 'Bearer ' + adminToken })
        .send({
          title: 'title2',
          body: 'body2',
          tagList: ['tag3', 'tag4'],
        })
        .end((err, res) => {
          res.should.have.status(200);
          Post.find().exec()
            .then(posts => {
              assert.equal(posts.length, 1);
              assert.equal(posts[0].title, 'title2');
              assert.equal(posts[0].body, 'body2');
              assert.equal(posts[0].tagList.length, 2);
              assert.equal(posts[0].tagList[0], 'tag3');
              assert.equal(posts[0].tagList[1], 'tag4');
              done();
            })
            .catch(done);
        });
    });

    it('should reject no title', done => {
      chai.request(server)
        .put(`/posts/${firstPost.slug}`)
        .set({ Authorization: 'Bearer ' + adminToken })
        .send({
          title: '',
          body: 'body',
          tagList: ['tag3', 'tag4'],
        })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('should reject noobs', done => {
      chai.request(server)
        .put(`/posts/${firstPost.slug}`)
        .set({ Authorization: 'Bearer ' + noobToken })
        .send({
          title: 'title',
          body: 'body',
          tagList: ['tag3', 'tag4'],
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('DELETE /posts', () => {
    let firstPost;

    beforeEach(done => {
      Post.deleteMany({}).exec()
        .then(() => injectPost('title', 'body', ['tag1', 'tag2'], lucy))
        .then((first) => {
          firstPost = first;
          done();
        })
        .catch(done);
    });

    it('should delete post successfully for admins', done => {
      chai.request(server)
        .delete(`/posts/${firstPost.slug}`)
        .set({ Authorization: 'Bearer ' + adminToken })
        .end((err, res) => {
          res.should.have.status(200);
          Post.find().exec()
            .then(posts => {
              assert.equal(posts.length, 0);
              done();
            })
            .catch(done);
        });
    });

    it('should reject noobs', done => {
      chai.request(server)
        .delete(`/posts/${firstPost.slug}`)
        .set({ Authorization: 'Bearer ' + noobToken })
        .end((err, res) => {
          res.should.have.status(401);
          Post.find().exec()
            .then(posts => {
              assert.equal(posts.length, 1);
              done();
            })
            .catch(done);
        });
    });
  });

  describe('/posts/:post/like', () => {
    let firstPost;

    beforeEach(done => {
      Post.deleteMany({}).exec()
        .then(() => User.findById(lucy._id))
        .then(saved => {
          lucy = saved;
          lucy.likes = [];
          return lucy.save();
        })
        .then(() => injectPost('title', 'body', ['tag1', 'tag2'], lucy))
        .then((first) => {
          firstPost = first;
          done();
        })
        .catch(done);
    });

    it('should like post successfully for admins', done => {
      chai.request(server)
        .post(`/posts/${firstPost.slug}/like`)
        .set({ Authorization: 'Bearer ' + adminToken })
        .end((err, res) => {
          res.should.have.status(200);
          Post.findById(firstPost._id).exec()
            .then(post => {
              assert.equal(post.likeCount, 1);
              return User.findById(lucy._id).exec();
            })
            .then(user => {
              assert.equal(user.likes.length, 1);
              assert.equal(user.likes[0].toString(), firstPost._id.toString());
              done();
            })
            .catch(done);
        });
    });

    it('should like post successfully for noobs', done => {
      chai.request(server)
        .post(`/posts/${firstPost.slug}/like`)
        .set({ Authorization: 'Bearer ' + noobToken })
        .end((err, res) => {
          res.should.have.status(200);
          Post.findById(firstPost._id).exec()
            .then(post => {
              assert.equal(post.likeCount, 1);
              return User.findById(bill._id).exec();
            })
            .then(user => {
              assert.equal(user.likes.length, 1);
              assert.equal(user.likes[0].toString(), firstPost._id.toString());
              done();
            })
            .catch(done);
        });
    });

    it('should reject people not logged in', done => {
      chai.request(server)
        .post(`/posts/${firstPost.slug}/like`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should unlike post successfully for admins', done => {
      User.findById(lucy._id).exec()
        .then(before => {
          before.likes = [];
          return before.save();
        })
        .then(() => lucy.like(firstPost._id))
        .then(() => {
          chai.request(server)
            .delete(`/posts/${firstPost.slug}/like`)
            .set({ Authorization: 'Bearer ' + adminToken })
            .end((err, res) => {
              res.should.have.status(200);
              Post.findById(firstPost._id).exec()
                .then(post => {
                  assert.equal(post.likeCount, 0);
                  return User.findById(lucy._id).exec();
                })
                .then(user => {
                  assert.equal(user.likes.length, 0);
                  done();
                })
                .catch(done);
            });
        })
        .catch(done);
    });

    it('should unlike post successfully for noobs', done => {
      User.findById(bill._id).exec()
        .then(before => {
          before.likes = [];
          return before.save();
        })
        .then(() => bill.like(firstPost._id))
        .then(() => {
          chai.request(server)
            .delete(`/posts/${firstPost.slug}/like`)
            .set({ Authorization: 'Bearer ' + noobToken })
            .end((err, res) => {
              res.should.have.status(200);
              Post.findById(firstPost._id).exec()
                .then(post => {
                  assert.equal(post.likeCount, 0);
                  return User.findById(bill._id).exec();
                })
                .then(user => {
                  assert.equal(user.likes.length, 0);
                  done();
                })
                .catch(done);
            });
        })
        .catch(done);
    });

    it('should reject users not logged in', done => {
      chai.request(server)
        .delete(`/posts/${firstPost.slug}/like`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});

const { injectUser, injectPost } = require('./tools');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');

describe('posts', () => {
  let lucy;
  let token;

  before((done) => {
    injectUser('lucy.zhang@duke.edu', 'Lucy Zhang', 'password', true)
      .then(saved => {
        lucy = saved;
        token = lucy.generateJwt();
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
        .set({ Authorization: 'Bearer ' + token })
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
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.title, 'title');
          assert.equal(res.body.liked, true);
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
        .set({ Authorization: 'Bearer ' + token })
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
        .set({ Authorization: 'Bearer ' + token })
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
});

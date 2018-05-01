const { injectUser, injectPost } = require('./tools');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

describe('tags', () => {
  before(done => {
    let lucy;

    injectUser('lucy.zhang@duke.edu', 'Lucy Zhang', 'password', true)
      .then(saved => {
        lucy = saved;
        return injectPost('title', 'body', ['tag1', 'tag2'], lucy);
      })
      .then(() => injectPost('title2', 'body2', ['tag2', 'tag3'], lucy))
      .then(() => {
        done();
      })
      .catch(done);
  });

  after(() => {
    return Promise.all([
      User.deleteMany({}).exec(),
      Post.deleteMany({}).exec(),
    ]);
  });

  it('should return all tags', done => {
    chai.request(server)
      .get('/tags')
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.length, 3);
        done();
      });
  });
});

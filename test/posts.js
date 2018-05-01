const { injectUser, injectPost } = require('./tools');

describe('posts', () => {
  describe('GET posts/', () => {
    let lucy;
    let token;

    before((done) => {
      injectUser('lucy.zhang@duke.edu', 'Lucy Zhang', 'password', true)
        .then(saved => {
          lucy = saved;
          token = lucy.generateJwt();
          return injectPost('title', 'body', ['tag1', 'tag2'], lucy);
        })
        .then(() => injectPost('title1', 'body', ['tag1'], lucy))
        .then(() => {
          done();
        });
    });

    it('should be able to view all posts', (done) => {
      chai.request(server)
        .get('/posts')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.length, 2);
          done();
        });
    });

    it('should be able to filter by tags', (done) => {
      chai.request(server)
        .get('/posts')
        .query({ tagList: JSON.stringify(['tag2']) })
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.length, 1);
          assert.equal(res.body[0].title, 'title');
          done();
        });
    });

    it('should be able to set an offset', (done) => {
      chai.request(server)
        .get('/posts')
        .query({ offset: 1 })
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.length, 1);
          // order by descending, so the first one added is here
          assert.equal(res.body[0].title, 'title');
          done();
        });
    });

    it('should be able to set a limit', (done) => {
      chai.request(server)
        .get('/posts')
        .query({ limit: 1 })
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.length, 1);
          assert.equal(res.body[0].title, 'title1');
          done();
        });
    });
  });
});

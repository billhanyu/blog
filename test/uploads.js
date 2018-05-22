const { MAX_SIZE } = require('../server/config');
const { injectUser } = require('./tools');
const mongoose = require('mongoose');
const User = mongoose.model('User');

describe('uploads', () => {
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

  after(() => {
    return Promise.all([
      User.deleteMany({}).exec(),
    ]);
  });

  it('should accept valid upload file', done => {
    chai.request(server)
      .post('/uploads')
      .set({ Authorization: 'Bearer ' + adminToken })
      .attach('upload', 'test/uploads/valid.png')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('path');
        done();
      });
  });

  it('should reject file too large', done => {
    chai.request(server)
      .post('/uploads')
      .set({ Authorization: 'Bearer ' + adminToken })
      .attach('upload', 'test/uploads/toolarge.jpg')
      .end((err, res) => {
        res.should.have.status(403);
        assert.equal(res.body.message, `File exceeds maximum allowed size: ${MAX_SIZE / 1000000} MB`);
        done();
      });
  });

  it('should reject file with invalid extension', done => {
    chai.request(server)
      .post('/uploads')
      .set({ Authorization: 'Bearer ' + adminToken })
      .attach('upload', 'test/uploads/wrongextension')
      .end((err, res) => {
        res.should.have.status(403);
        assert.equal(res.body.message, 'Forbidden file extension');
        done();
      });
  });

  it('should reject noob users', done => {
    chai.request(server)
      .post('/uploads')
      .set({ Authorization: 'Bearer ' + noobToken })
      .attach('upload', 'test/uploads/valid.png')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

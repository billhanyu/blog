const { MAX_SIZE } = require('../server/config');

describe('uploads', () => {
  it('should accept valid upload file', done => {
    chai.request(server)
      .post('/uploads')
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
      .attach('upload', 'test/uploads/wrongextension')
      .end((err, res) => {
        res.should.have.status(403);
        assert.equal(res.body.message, 'Forbidden file extension');
        done();
      });
  });
});

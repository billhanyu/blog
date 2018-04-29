describe('user', () => {
  describe('user sign up', () => {
    it('should successfully sign up a new user and return token', (done) => {
      chai.request(server)
        .post('/user/signup')
        .send({
          email: 'han.yu@duke.edu',
          name: 'yuhan',
          password: 'Password',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          done();
        });
    });
  });
});

const chai = global.chai = require('chai');
const chaiHttp = require('chai-http');
process.env.MONGO_URL = 'mongodb://localhost:27017/test';
global.server = require('../server/server');
global.should = chai.should();
global.assert = chai.assert;
chai.use(chaiHttp);

const mongoose = require('mongoose');

before((done) => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => mongoose.connection.db.dropDatabase(done))
    .catch(err => done(err));
});

describe('404', () => {
  it('should 404 for undefined routes', (done) => {
    chai.request(server)
      .get('/illneverusethisroute')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

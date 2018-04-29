const chai = global.chai = require('chai');
const chaiHttp = require('chai-http');
process.env.MONGO_URL = 'mongodb://localhost:27017/test';
global.server = require('../server/server');
global.should = chai.should();
chai.use(chaiHttp);

const mongoose = require('mongoose');

before((done) => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => mongoose.connection.db.dropDatabase(done));
});

const mongoose = reuire('mongoose');
const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller - Login', async function () {
  it('should throw an error with code 500 if accessing the database fails', function (done) {
    sinon.stub(User, 'findOne').throws();

    const req = {
      body: {
        email: 'test@test.com',
        password: 'tester',
      }
    }

    AuthController
      .login(req, {}, () => { })
      .then(response => {
        expect(response).to.be.an('error');
        expect(response).to.have.property('statusCode', 500);

        done();
      });

    User.findOne.restore();
  });

})
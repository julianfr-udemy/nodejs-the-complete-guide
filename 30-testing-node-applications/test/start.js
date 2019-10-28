const expect = require('chai').expect;
const { validateToken } = require('./auth-middleware');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

describe('Auth middleware', function () {

  it('should throw an error if no authorization header is present', function () {
    const req = {
      get: function (header) {
        return null;
      }
    };

    expect(validateToken.bind(this, req, {}, () => { })).to.throw('Not authenticated.');
  });

  it('should throw an error if the authorization header is only one string', function () {
    const req = {
      get: function (header) {
        return 'xyz';
      }
    };

    expect(validateToken.bind(this, req, {}, () => { })).to.throw();
  });

  it('should throw an error if the token cannot be verified', function () {
    const req = {
      get: function (header) {
        return 'Bearer xyz';
      }
    };

    expect(validateToken.bind(this, req, {}, () => { })).to.throw();
  });

  it('should yield a userId after decoding the token', function () {
    const req = {
      get: function (header) {
        return 'Bearer adsfsadfsdfdsfdsfxyz';
      }
    };

    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc' });

    validateToken(req, {}, () => { });
    expect(jwt.verify.called).to.be.true;
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'abc');

    jwt.verify.restore();
  });

});
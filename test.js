/**
 * To run the test run 'Mocha' from the command line
 */

var nra    = require('./nra.js'),
    sha1   = require('sha1'),
    assert = require('assert');

describe('node-rest-auth', function () {

  it ('it should validate that the: user + salt + api-key are valid', function (done) {

      user = 'Reseller One',
      key = '1234567',
      salt = new Date().getTime(),
      hash = sha1(user + key + salt);

      nra.auth(user,salt,hash, function(err, result) {
          if (err) throw err;
          done();
      });

  });

});
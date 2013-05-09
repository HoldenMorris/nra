/**
 * To run the test run 'Mocha' from the command line
 */

var nra    = require('./nra'),
    sha1   = require('sha1'),
    redis  = require("redis"),
    assert = require('assert');

// Init and set up Fixture Data
var user    = 'Reseller One',
    user_id = sha1(user),
    key     = '1234567',
    salt    = new Date().getTime(),
    hash    = sha1(user + key + salt),
    rc      = redis.createClient();

rc.HMSET(user_id, {
    'salt': 0,
    'key': key
});

// Now run the tests
describe('node-rest-auth', function () {

  it ('it should validate that the: user + salt + api-key are valid', function (done) {

      nra.auth(user,salt,hash, function(err, result) {
          if (err) throw err;
          done();
      });

  });

});
var nra    = require('./nra.js'),
    sha1   = require('sha1'),
    assert = require('assert');

describe('node-rest-auth', function () {

  it ('it should validate that the: user + salt + api-key are valid', function () {

    var hash = 'bf1d9b9fd99a17d71cdea7a00d1bab5e8f97440c';

    assert.equal( true, nra(hash) );

  });

});
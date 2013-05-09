/**
 * Demo
 */

var nra    = require('./nra'),
    sha1   = require('sha1'),
    redis  = require("redis");

// Init and set up Fixture Data
var user    = 'Reseller One',
    user_id = sha1(user),
    key     = '1234567',
    salt    = new Date().getTime(),
    hash    = sha1(user + key + salt),
    rc      = redis.createClient();

rc.HMSET(user_id, {'salt': 0,'key': key},function() {

    nra.auth(user,salt,hash, function(err, result) {
        if (err) {
            console.log('err: '+err);
        } else {
            console.log('result: '+result);
        }
    });

});







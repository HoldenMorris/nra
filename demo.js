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
    rc4_key = sha1('RC4'+ key + salt),
    hash    = sha1(user + key + salt),
    rc      = redis.createClient();


// Test RC4
var rc4_test    =  'Test RC4 encodeing.',
    rc4_msg_in  = nra.rc4(rc4_key,rc4_test),
    rc4_msg_out = nra.rc4(rc4_key,rc4_msg_in);
console.log( 'RC4 Test: '+(rc4_test==rc4_msg_out) );

// Test Auth
rc.HMSET(user_id, {'salt': 0,'key': key},function() {

    nra.auth(user,salt,hash, function(err, result) {

        // Result
        if (err) {
            console.log('Err: '+err);
        } else {
            console.log('Result: '+result);
        }

        // Done
        process.exit();

    });

});




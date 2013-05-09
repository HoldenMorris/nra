NRA
===


'Node-Rest-Auth' authenticates rest type http api requests using a username, nonce salt and a hash.

Warning
-------

This library is still under development. There are bugs. APIs will change. Docs may be wrong.

Keep in mind this is something I make in my free time and that's something I've had very little of lately thanks to my many other projects.

Installation
------------

    npm install nra

Example
-------

~~~ javascript

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
~~~

This will return true or false.


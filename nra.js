(function () {

  var redis = require("redis"),
      sha1  = require('sha1');

  // Auth function
  exports.auth = function (user, salt, hash, callback) {

    // Init
    var err     = null,
        msg     = null,
        rc      = redis.createClient(),
        user_id = sha1(user);

    rc.on("error", function (err) {
      console.log('Error: '+err)
    });

    // Load User
    rc.hgetall(user_id, function (err, data) {
      console.log(data);
      if( !err && data ){

        //rc.hset(user_id, "key", "1234567");
        //rc.hdel(user_id,'hashtest 1');

        rc.hset(user_id, "salt", salt);

        // Test if salt is valid
        if (salt <= data.salt) err='Invalid Salt';

        // Test if hash is valid
        var test_hash = sha1(user + data.key + salt);

        console.log('Test B: ' + test_hash);
        msg = (test_hash == hash);

      } else {
        err = 'Invalid User'
      }
      rc.quit();
      callback(err,msg);
    });

  };

})();

/**
 * Used to test if the user, salt and hash are valid.
 * @author holdenm@synaq.com
 * @version 0.0.1
 */

(function () {

  var redis = require("redis"),
      sha1  = require('sha1');

    /**
     * Auth function
     * @param user
     * @param salt
     * @param hash
     * @param callback
     */
  exports.auth = function (user, salt, hash, callback) {

    // Init
    var err     = null,
        msg     = null,
        rc      = redis.createClient(),
        user_id = sha1(user);

    rc.on("error", function (err) {
      console.log('Error: '+err)
    });

    // Load User from Redis and Test
    rc.hgetall(user_id, function (err, data) {
      if( !err && data ){
        rc.hset(user_id, "salt", salt);

        // Test if salt is valid
        if (salt <= data.salt) err = new Error('Invalid Salt');

        // Test if hash is valid
        var test_hash = sha1(user + data.key + salt);
        msg = (test_hash == hash);

      } else {
        err = new Error('Invalid User');
      }
      rc.quit();
      callback(err,msg);
    });

  };

})();

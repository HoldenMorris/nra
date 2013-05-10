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
        rc.HGETALL(user_id, function (err, data) {

            if( !err && data ){

                rc.HSET(user_id, "salt", salt);

                // Test if salt is valid
                if (salt <= data.salt) err = new Error('Invalid Salt');

                // Test if hash is valid
                var test_hash = sha1(user + data.key + salt);
                msg = (test_hash == hash);

            } else {

                // Could not find a valid user
                err = new Error('Invalid User');

            }

            // Clean up and return callback
            rc.quit();
            callback(err,msg);

        });

    }

    /**
     * RC4 Crypto
     * @param key
     * @param str
     * @returns {string}
     */
    exports.rc4 = function rc4(key, str) {
        var s = [], j = 0, x, res = '';
        for (var i = 0; i < 256; i++) {
            s[i] = i;
        }
        for (i = 0; i < 256; i++) {
            j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
            x = s[i];
            s[i] = s[j];
            s[j] = x;
        }
        i = 0;
        j = 0;
        for (var y = 0; y < str.length; y++) {
            i = (i + 1) % 256;
            j = (j + s[i]) % 256;
            x = s[i];
            s[i] = s[j];
            s[j] = x;
            res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
        }
        return res;
    }

})();

var nra    = require('./nra'),
    sha1   = require('sha1'),

    user = 'Reseller One',
    key = '1234567',
    salt = new Date().getTime(),
    hash = sha1(user + key + salt);

nra.auth(user,salt,hash, function(err, result) {
  if (err) {
    console.log('err: '+err);
  } else {
    console.log('result: '+result);
  }
});



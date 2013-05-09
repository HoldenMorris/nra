(function() {

  var sha1 = require('sha1'),

  // The core
  npa = function (message){
    var hash = sha1( 'user'+'nonce-salt'+'private-api-key' );
    return (message==hash);
  };

  module.exports = npa;

})();

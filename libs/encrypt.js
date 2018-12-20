var crypto = require('crypto');
module.exports.encryptPassword = function(password){
  var hash = crypto.createHmac('sha256',password)
                   .update("ticket-key")
                   .digest('hex');
  return hash
};

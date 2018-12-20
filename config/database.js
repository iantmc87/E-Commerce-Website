//db setup
var mongoose = require('mongoose');

var dbPath = "mongodb://localhost/ticketDB";
mongoose.connect(dbPath);
mongoose.connection.once('open',function(){
  console.log("Database connection successful.");
});

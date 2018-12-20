var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

  userId : {type:String,default:"",required:true},
  firstName : {type:String,default:"",required:true},
  surname : {type:String,default:"", required:true},
  email : {type:String,default:"",required:true},
  password : {type:String,default:"",required:true},
  secureQuestion : {type:String,default:"",required:true},
  secureAnswer : {type:String,default:"",required:true},
  telephone : {type:Number, default:""},
  firstLineAddress : {type:String, default:"Not Provided"},
  town : {type:String, default:"Not Provided"},
  county : {type:String, default:"Not Provided"},
  postCode : {type:String, default:"Not Provided"},
  createdOn : {type:Date,default:Date.now},
  updatedOn : {type:Date,default:Date.now}

});
mongoose.model('user',userSchema);

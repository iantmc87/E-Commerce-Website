var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({

  productName : {type:String, default:"", required:true},
  category : {type:String, default:"", required:true},
  images : [],
  price : {type:Number, default:"", required:true},
  location : {type:String, default:"", required:true},
  date : {type:String, default:"", required:true},
  createdOn : {type:Date,default:Date.now},
  updatedOn : {type:Date,default:Date.now}

});

mongoose.model('product',productSchema);

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({

  orderedBy : {type:String, default:"", required:true},
  productId : [],
  productName : [],
  productPrice : [],
  productQty : [],
  uniqueProducts : {type:Number, default:"", required:true},
  quantity : {type:Number, default:"", required:true},
  price : {type:Number, default:"", required:true},
  orderDate : {type:Date, default:"", required:true},
  paymentMethod : {type:String, default:"Debit Card"},
  telephone : {type:Number, default:""},
  firstLineAddress : {type:String, default:"Not Provided"},
  town : {type:String, default:"Not Provided"},
  county : {type:String, default:"Not Provided"},
  postCode : {type:String, default:"Not Provided"},
  deliveryStatus : {type:String, default:"Being Processed"}
  
});

mongoose.model('order',orderSchema);

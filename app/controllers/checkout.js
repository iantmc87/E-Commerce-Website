var express = require('express');
var mongoose = require('mongoose');

var auth = require('../../middlewares/auth');

var router = express.Router();

var productModel = mongoose.model('product');
var userModel = mongoose.model('user');
var orderModel = mongoose.model('order');

module.exports.controller = function(app){

  router.get("/checkout/confirm-address",auth.checkLogin,function(req,res){
    res.render('checkout',
                {
                  title:"Checkout",
                  user:req.session.user,
                  cart:req.session.cart
                });
  });

  var address = {};

  router.post("/checkout/proceed",auth.checkLogin,function(req,res){

    address.telephone = req.body.telephone;
    address.firstLineAddress = req.body.firstLineAddress;
    address.town = req.body.town;
    address.county = req.body.county;
    address.postCode = req.body.postCode;

    res.render('checkout-final-step',
                {
                  title:" Checkout",
                  user:req.session.user,
                  cart:req.session.cart
                });
  });

  router.get("/checkout/make-order",auth.checkLogin,function(req,res){

    var arrId = [];
    var arrQty = [];
    var arrName = [];
    var arrPrice = [];
    var count = 0;
    for(id in req.session.cart.items){
      arrId.push(id);
      arrQty.push(req.session.cart.items[id].quantity);
      arrName.push(req.session.cart.items[id].item.productName);
      arrPrice.push(req.session.cart.items[id].item.price);
      count++;
    }

    today = Date.now();

    var newOrder = new orderModel({

      orderedBy : req.session.user.userId,
      productId : arrId,
      productName : arrName,
      productPrice : arrPrice,
      productQty : arrQty,
      uniqueProducts : count,
      quantity : req.session.cart.totalQuantity,
      price : req.session.cart.totalPrice,
      orderDate :today,
      telephone : address.telephone,
      firstLineAddress : address.firstLineAddress,
      town : address.town,
      county : address.county,
      postCode : address.postCode

    });

    newOrder.save(function(err,result){
      if(err){
        console.log(err);
        res.render('message',
                    {
                      title:"Error",
                      msg:"Error placing order please try again",
                      status:500,
                      error:err,
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else if(result == undefined || result == null || result == ""){
        res.render('message',
                    {
                      title:"Empty",
                      msg:"Error placing order please try again",
                      status:404,
                      error:"",
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else{
        delete req.session.cart;
        res.redirect('/user/orders');
      }
    });

  });

  app.use(router);

}

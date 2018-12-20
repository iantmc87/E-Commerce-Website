var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var productModel = mongoose.model('product');

module.exports.controller = function(app){

  router.get("/",function(req,res){
    productModel.find({},function(err,result){
      if(err){
        console.log(err);
        res.render('message',
                    {
                      title:"Error",
                      msg:"Error finding tickets, please try again",
                      status:500,
                      error:err,
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else{
        productModel.count({},function(err,count){
          if(err){
            console.log(err);
            res.render('message',
                        {
                          title:"Error",
                          msg:"Error occurred reading database, please try again",
                          status:500,
                          error:err,
                          user:req.session.user,
                          cart:req.session.cart
                        });
          }
          else{
            res.render('home',
                        {
                          title:"Ticket Shop",
                          user:req.session.user,
                          cart:req.session.cart,
                          product:result,
                          count:count
                        });
          }
        });
      }
    });
  });

  router.get('/product/single-product/:id',function(req,res){
    productModel.findOne({'_id':req.params.id},function(err,result){
      if(err){
        console.log(err);
        res.render('message',
                    {
                      title:"Error",
                      msg:"Error occured reading database, please try again",
                      status:500,
                      error:err,
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else if(result == undefined || result == null || result == ""){
        res.render('message',
                    {
                      title:"Not Found",
                      msg:"Ticket does not exist, please choose another option",
                      status:404,
                      error:"",
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else{
        res.render('single-product',
                    {
                      title:"Product Details",
                      user:req.session.user,
                      cart:req.session.cart,
                      product:result
                    });
      }
    });
  });

  app.use(router);

}

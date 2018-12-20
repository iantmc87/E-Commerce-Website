var express = require('express');
var mongoose = require('mongoose');

var encrypt = require('../../libs/encrypt');
var auth = require('../../middlewares/auth');

var router = express.Router();

var userModel = mongoose.model('user');

module.exports.controller = function(app){

  router.get("/forgot-password/step-one",auth.loggedIn,function(req,res){

    res.render('forgot-password',
                {
                  title:"Forgot Password",
                  user:req.session.user,
                  cart:req.session.cart,
                  step:1
                });

  });

  router.post("/forgot-password/step-two",auth.loggedIn,function(req,res){

    userModel.findOne({'email':req.body.email},function(err,result){
      if(err){
        res.render('message',
                    {
                      title:"Error",
                      msg:"Error occured during log-in please try again",
                      status:500,
                      error:err,
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else if(result == null || result == undefined || result == ""){
        res.render('message',
                    {
                      title:"Error",
                      msg:"User not found, please check e-mail and try again",
                      status:404,
                      error:"",
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else{
        res.render('forgot-password',
                    {
                      title:"Forgot Password - Ticket Shop",
                      user:req.session.user,
                      cart:req.session.cart,
                      step:2,
                      userId:result.userId,
                      question:result.secureQuestion
                    });
      }
    });

  });

  router.post("/forgot-password/step-final",auth.loggedIn,function(req,res){

    userModel.findOne({$and:[{'userId':req.body.userId},{'secureAnswer':req.body.secureAnswer}]},function(err,result){
      if(err){
        res.render('message',
                    {
                      title:"Error",
                      msg:"Error occured during log-in please try again",
                      status:500,
                      error:err,
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else if(result == null || result == undefined || result == ""){
        res.render('message',
                    {
                      title:"Error",
                      msg:"User not found, please check answer and try again",
                      status:404,
                      error:"",
                      user:req.session.user,
                      cart:req.session.cart
                    });
      }
      else{
        res.render('forgot-password',
                    {
                      title:"Forgot Password - Ticket Shop",
                      user:req.session.user,
                      cart:req.session.cart,
                      step:3,
                      userId:result.userId
                    });
      }
    });
  });

  router.put("/forgot-password/change",auth.loggedIn,function(req,res){

    //encrypt
    var epass = encrypt.encryptPassword(req.body.password);

    req.body.updatedOn = Date.now();
    req.body.password = epass;

    var update = req.body;

    userModel.findOneAndUpdate({'userId':req.body.userId},update,function(err,result){
      if(err){
        console.log(err);
        res.render('message',
                    {
                      title:"Error",
                      msg:"Error occurred changing password, please try again",
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
                      msg:"User does not exist, please check inputs and try again",
                      status:404,
                      error:"",
                      user:req.session.user,
                      cart:req.session.cart
                    });

      }
      else{
        res.redirect('/user/login');
      }
    });
  });

  app.use("/user",router);

}

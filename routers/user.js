const express=require("express");
const route=express.Router();
const User=require("../models/user.js");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const asyncWraper=require("../util/asyncWraper.js");
const { redirectUrl } = require("../middleware.js");
const userController=require("../controllers/user.js");

//register form
route.get('/register',userController.registerForm);

//register user
route.post('/register',asyncWraper(userController.registerUser));

//login form
route.get('/login',userController.loginForm);

//login user
route.post('/login', redirectUrl, passport.authenticate('local',{
    failureFlash:true,
    failureRedirect:'/login'
}),asyncWraper(userController.loginUser));

//logout user
route.get('/logout',userController.logoutUser);

module.exports=route;
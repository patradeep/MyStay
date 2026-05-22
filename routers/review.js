const express=require('express');
const route=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const asyncWraper=require("../util/asyncWraper.js");
const { isLoggedIn } = require('../middleware.js');
const reviewController=require("../controllers/review.js");

//create review
route.post('/',isLoggedIn,asyncWraper(reviewController.createReview));
//delete review
route.delete('/:reviewId',isLoggedIn,asyncWraper(reviewController.deleteReview));

module.exports=route;
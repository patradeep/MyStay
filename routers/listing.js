const express=require("express");
const route=express.Router();
const Listing=require("../models/listing.js");
const asyncWraper=require("../util/asyncWraper.js");

const {isLoggedIn,isOwner}=require('../middleware.js');
const listingController=require("../controllers/listing.js");
const {upload}=require("../cloudConfig.js");

//index route- show all listings
route.get('/',asyncWraper(listingController.allListings)); 
//new listing
route.get('/new',isLoggedIn,listingController.renderNewForm)
//create listing
route.post('/new',isLoggedIn,upload.single('image'),asyncWraper(listingController.createListing))
//delete listing
route.delete('/:id',isLoggedIn,isOwner,asyncWraper(listingController.deleteListing))
//edit listing
route.get('/:id/edit',isLoggedIn,isOwner,asyncWraper(listingController.renderEditForm))
//update listing
route.put('/:id',isLoggedIn,isOwner,upload.single('image'),asyncWraper(listingController.updateListing))
//show a listing with particular id
route.get('/:id',asyncWraper(listingController.showListing))

module.exports=route;
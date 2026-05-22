const Listing=require("../models/listing");
const { streamUpload } = require('../cloudConfig');


module.exports.allListings=async(req,res)=>{
    let allListings=await Listing.find();
    res.render("listing/index.ejs",{allListings})
}

module.exports.renderNewForm=(req,res)=>{
    res.render('listing/newlisting.ejs');
}

module.exports.createListing = async (req, res, next) => {
  try {
    let imageUrl;
    let imageId;
    if (req.file && req.file.buffer) {
      const result = await streamUpload(req.file.buffer, { folder: 'listings' });
      imageUrl = result.secure_url;
      imageId = result.public_id;
    }
    const { title, description, price, location, country } = req.body;
    const newlisting = new Listing({ title, description, price, location, country, image: imageUrl });
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success", "New listing created!");
    res.redirect('/listing');
  } catch (err) {
    next(err);
  }
};

module.exports.deleteListing=async(req,res)=>{
    let {id} = req.params;
    let deleted=await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success","Listing deleted!");
    res.redirect('/listing');
}

module.exports.renderEditForm=async(req,res)=>{
    let {id} = req.params;
    let list=await Listing.findById(id);
    let imageUrl=list.image.replace("/upload/","/upload/h_300/");
    res.render('listing/update.ejs',{list, imageUrl});
}

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let {title,description,price,location,country}=req.body;
    let updated=await Listing.findByIdAndUpdate(
        id,
        {title,description,price,location,country},
        {new:true, runValidators:true}
    );
    if (req.file && req.file.buffer) {
        const result = await streamUpload(req.file.buffer, { folder: 'listings' });
        updated.image = result.secure_url;
        await updated.save();
    }
    req.flash("success","Listing updated!");
    res.redirect(`/listing/${id}`);
}

module.exports.showListing=async(req,res)=>{ 
    let {id}=req.params;
    let list=await Listing.findById(id).populate({path: 'reviews', populate: { path: 'author' }}).populate("owner");
    res.render("listing/show.ejs",{list})
}
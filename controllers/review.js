const Review=require("../models/review");
const Listing=require("../models/listing");

module.exports.createReview=async(req,res)=>{
    let {listId}=req.params;
    let {rating, comment}=req.body;
    const review=new Review({rating, comment});
    review.author=req.user._id;
    console.log(review);
    await review.save();
    let list=await Listing.findById(listId);
    list.reviews.push(review);
    await list.save();
    req.flash("success","Review added!");
    res.redirect(`/listing/${listId}`);
}

module.exports.deleteReview=async(req,res)=>{
    let {listId, reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash("error","You don't have permission to do that!");
        return res.redirect(`/listing/${listId}`);
    }
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(listId,{$pull:{reviews:reviewId}});
    req.flash("success","Review deleted!");
    res.redirect(`/listing/${listId}`);
}
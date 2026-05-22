const Listing=require("./models/listing.js");

const isLoggedIn = function(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.redirectTo = req.originalUrl;
        req.flash("error", "You must be logged in to access this page.");
        return res.redirect('/login');
    }
    next();
};

const redirectUrl=function(req, res, next) {
    if (req.session.redirectTo) {
        res.locals.redirectTo = req.session.redirectTo;
    }
    next();
};

const isOwner=async function(req,res,next){
    let {id}=req.params;
    let list=await Listing.findById(id);
    if(!list.owner.equals(req.user._id)){
        req.flash("error","You don't have permission to do that!");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports = { isLoggedIn, redirectUrl, isOwner };
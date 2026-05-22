if(process.env.NODE_ENV!=="production"){
    require('dotenv').config();
}
const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const methodOverride = require('method-override')
const ejsMate=require('ejs-mate');
const { MongoStore } = require('connect-mongo');
const session=require("express-session");
const flash=require("connect-flash");
const ExpressError=require("./util/ExpressError.js");
const listingRoutes=require("./routers/listing.js");
const reviewRoutes=require("./routers/review.js");
const User=require("./models/user.js");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const userRoutes=require("./routers/user.js");

const app=express();

const store=MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    crypto: {
        secret: process.env.SESSION_SECRET
    },
    touchAfter: 24 * 3600
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7,
        httpOnly:true
    },
    store: store
}));
 

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")))
const mongoDB_url=process.env.MONGO_URI;

async function main() {
    await mongoose.connect(mongoDB_url);
}

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;
    next();
})

//listing routes
app.use('/listing',listingRoutes);
//review routes
app.use('/listing/:listId/review',reviewRoutes);
//user routes
app.use('/',userRoutes);

app.all('/{*any}',(req,res,next)=>{
    next(new ExpressError("Page Not Found",404));
})

app.use((err,req,res,next)=>{
    const {message="Something went wrong",statusCode=500}=err;
    res.status(statusCode).render('listing/error.ejs',{message});
})

app.listen(process.env.PORT,()=>{
    console.log("server is running") 
})
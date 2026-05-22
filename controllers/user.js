const User=require("../models/user.js");

module.exports.registerForm=(req,res)=>{
    res.render('user/register.ejs');
}

module.exports.registerUser=async(req,res,next)=>{
    try{
        const {email,username,password}=req.body;
        const user=new User({email,username});
        const newUser=await User.register(user,password);
        req.login(newUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Registered successfully!");
            let redirectTo=res.locals.redirectTo || '/listing';
            delete res.locals.redirectTo;
            res.redirect(redirectTo);
        });
    }catch(e){
        req.flash("error",e.message);
        return res.redirect('/register');
    }
}

module.exports.loginForm=(req,res)=>{
    res.render('user/login.ejs');
}

module.exports.loginUser=async(req,res)=>{ 
    req.flash("success","Logged in successfully!");
    let redirectTo=res.locals.redirectTo || '/listing';
    delete res.locals.redirectTo;
    res.redirect(redirectTo);
}

module.exports.logoutUser=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    });
    req.flash("success","Logged out successfully!");
    res.redirect('/listing');
}
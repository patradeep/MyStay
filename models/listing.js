const mongoose=require("mongoose");
const Review=require("./review.js");
const User=require("./user.js");

const listingSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://cdn.vectorstock.com/i/1000v/70/01/no-image-symbol-missing-available-icon-gallery-vector-42607001.jpg",
        set:(v)=>v===""?"https://cdn.vectorstock.com/i/1000v/70/01/no-image-symbol-missing-available-icon-gallery-vector-42607001.jpg":v
    },
    price:{
        type:Number,
        required:true,
        min:1
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

listingSchema.post("findOneAndDelete",async function(doc){
    if(doc && doc.reviews.length > 0){
        await Review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
})
const Listing=mongoose.model("Listing",listingSchema);


module.exports=Listing;
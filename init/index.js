const mongoose=require("mongoose");

const initData=require('./data.js')

const Listing=require("../models/listing.js");

const mongoDB_url='mongodb://127.0.0.1:27017/mystay';

async function main() {
    await mongoose.connect(mongoDB_url);
}

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

const init=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((item)=>({
        ...item,owner:'6a071f657b86213d3b13af45'
    }))
    await Listing.insertMany(initData.data);
    console.log("initialization successfull");
}
init();
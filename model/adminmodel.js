const mongoose=require('mongoose');
const adminmodel=mongoose.model("loginmodel",new mongoose.Schema({ 
    Username:{type:String,required:true},
    Password:{type:String,required:true},
}));
module.exports=adminmodel;
const mongoose=require('mongoose');
const usermodel=mongoose.model("signup",new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    password:{type:String,required:true}
}));
module.exports=usermodel
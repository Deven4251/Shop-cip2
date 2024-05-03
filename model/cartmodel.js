const mongoose=require('mongoose');
const cartmodel=mongoose.model("cart",new mongoose.Schema({
    email:{type:String,required:true},
    pid:{type:String,required:true},
    pname:{type:String,required:true},
    price:{type:String,required:true},
    offer:{type:String,required:true},
    pic:{type:String,required:true},
    qty:{type:String,required:true}
}));
module.exports=cartmodel
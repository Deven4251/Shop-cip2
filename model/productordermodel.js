const mongoose=require('mongoose');
const productordermodel=mongoose.model("productorder",new mongoose.Schema({
    orderno:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    orderdate:{type:String,required:true},
    amount:{type:String,required:true},
    mobile:{type:String,required:true},
    address:{type:String,required:true},
    paymentmode:{type:String,required:true},
    orderstatus:{type:String,required:true}
}));
module.exports=productordermodel;
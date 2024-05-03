const mongoose=require('mongoose');
const orderdetailsmodel=mongoose.model("orderdetails",new mongoose.Schema({
    orderno:{type:String,required:true},
    pname:{type:String,required:true},
    price:{type:String,requierd:true},
    pic:{type:String,required:true},
    qty:{type:String,requierd:true}
}));
module.exports=orderdetailsmodel
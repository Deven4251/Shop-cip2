const mongoose=require('mongoose');
const categorymodel=mongoose.model("catmodels",new mongoose.Schema({ 
    catname:{type:String,required:true},
}));
module.exports=categorymodel;
var mongoose=require("mongoose")
var reviewSchema=new mongoose.Schema({
    username:String,
    content:String,
    date:{type:Date,default:Date.now},
    profile:String

})
var reviewModel=mongoose.model("review",reviewSchema)
module.exports=reviewModel

// var mongoose=require("mongoose");

// var userSchema=new mongoose.Schema({
//     "email": String,
//     "password":String
// })
// var UserModel=mongoose.model("user",userSchema);
// module.exports=UserModel;

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },  // ✅ add this line
  password: { type: String, required: true }
});

var UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;

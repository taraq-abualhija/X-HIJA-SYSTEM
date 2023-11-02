const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// define the Schema (the structure of the article)
const userSchema = new Schema({
  profileImg:String,
  username: String,
  email: String,
  password: String,
  customerInfo:[
    {
      FirstName: String,
      LastName: String,
      Email: String,
      Telephone: String,
      Age: Number,
      Gender: String,
      Country: String,
      createdAt:Date,
      updatedAt:{ type: Date, default: Date.now }}
  ]
});
 
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next(); 
});
// Create a model based on that schema
const userModel = mongoose.model("User", userSchema);
// export the model
module.exports = userModel;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// define the Schema (the structure of the article)
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
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

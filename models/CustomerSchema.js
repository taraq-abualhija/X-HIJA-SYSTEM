const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const userSchema = new Schema(
  {
    FirstName: String,
    LastName: String,
    Email: String,
    Telephone: String,
    Age: Number,
    Gender: String,
    Country: String,
  },
  { timestamps: true }
);

// Create a model based on that schema
const user = mongoose.model("Customer", userSchema);

// export the model
module.exports = user;

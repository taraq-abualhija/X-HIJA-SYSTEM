// The time for created/updated on => for user
var moment = require("moment");
// user schema => Userbase
const User = require("../models/AuthUser");
// for encrypt the password
const bcrypt = require("bcrypt");
// for token
var jwt = require("jsonwebtoken");

require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// GET request  (NEW)
const user_index_get = (req, res) => {
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_PRIVATE_KEY);
  // result ==> array of objects
  User.findOne({ _id: decoded.id }).then((result) => {
    res.render("index", { arr: result.customerInfo, moment: moment });
  }); 
};
const user_add_get = (req, res) => {
  res.render("user/add");
};

const user_view_get = (req, res) => {
  User.findOne({ "customerInfo._id": req.params.id })
    .then((result) => {
      const clickedObj = result.customerInfo.find((item) => {
        return item._id == req.params.id;
      });
      res.render("user/view", { obj: clickedObj, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_edit_get = (req, res) => {
  User.findOne({ "customerInfo._id": req.params.id })
    .then((result) => {
      const clickedObj = result.customerInfo.find((item) => {
        return item._id == req.params.id;
      });
      res.render("user/edit", { obj: clickedObj, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

// POST request  (NEW)
const user_add_post = (req, res) => {
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_PRIVATE_KEY);
  User.updateOne(
    { _id: decoded.id },
    {
      $push: {
        customerInfo: {
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Email: req.body.Email,
          Telephone: req.body.Telephone,
          Age: req.body.Age,
          Country: req.body.Country,
          Gender: req.body.Gender,
          createdAt: new Date(),
        },
      },
    }
  )
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_search_post = (req, res) => {
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_PRIVATE_KEY);
  const searchText = req.body.searchText.trim();
  User.findOne({ _id: decoded.id })
    .then((result) => {
      const temp = result.customerInfo.filter((item) => {
        return (
          item.FirstName.includes(searchText) ||
          item.LastName.includes(searchText)
        );
      });
      res.render("user/search", { arr: temp, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_profilePicture_post = (req, res, next) => {
  cloudinary.uploader.upload(
    req.file.path,
    { folder: "X-HIJA/ProfileImg" },
    async (error, result) => {
      if (result) {
        const decoded = jwt.verify(
          req.cookies.jwt,
          process.env.JWT_PRIVATE_KEY
        );
        const avatar = await User.updateOne(
          { _id: decoded.id },
          { profileImg: result.secure_url }
        ).then(() => {
          res.redirect("/home");
        });
      }
    }
  );
};

// DELETE request
const user_edit_delete = (req, res) => {
  User.updateOne(
    { "customerInfo._id": req.params.id },
    { $pull: { customerInfo: { _id: req.params.id } } }
  )
    .then((result) => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_index_delete = (req, res) => {
  // const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_PRIVATE_KEY); #1
  User.updateOne(
    // { _id: decoded.id } == { "customerInfo._id": req.params.id } the same #2
    { "customerInfo._id": req.params.id },
    { $pull: { customerInfo: { _id: req.params.id } } }
  )
    .then((result) => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

// PUT request ==  Update Data
const user_update = (req, res) => {
  User.updateOne(
    { "customerInfo._id": req.params.id },
    { 
      "customerInfo.$.FirstName": req.body.FirstName,
          "customerInfo.$.LastName": req.body.LastName,
          "customerInfo.$.Email": req.body.Email,
          "customerInfo.$.Telephone": req.body.Telephone,
          "customerInfo.$.Age": req.body.Age,
          "customerInfo.$.Country": req.body.Country,
          "customerInfo.$.Gender": req.body.Gender,
          "customerInfo.$.updatedAt": new Date(),
    } 
  ) 
    .then((result) => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  user_index_get,
  user_add_get,
  user_view_get,
  user_edit_get,
  user_add_post,
  user_search_post,
  user_edit_delete,
  user_index_delete,
  user_update,
  user_profilePicture_post,
};

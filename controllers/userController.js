// The time for created/updated on => for user
var moment = require("moment");
// customer schema => Userbase
const User = require("../models/CustomerSchema");

// GET request
const user_index_get = (req, res) => {
  // result ==> array of objects
  console.log("========================================");
  User.find().then((result) => {
    res.render("index", { arr: result, moment: moment });
  });
};
const user_add_get = (req, res) => {
  res.render("user/add");
};

const user_view_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_edit_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

// POST request
const user_add_post = (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_search_post = (req, res) => {
  const searchText = req.body.searchText.trim();

  User.find({ $or: [{ FirstName: searchText }, { LastName: searchText }] })
    .then((result) => {
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

// DELETE request
const user_edit_delete = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result);
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_index_delete = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

// PUT request ==  Update Data
const user_update = (req, res) => {
  console.log(req.body);
  User.updateOne({ _id: req.params.id }, req.body)
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
};

const User = require("../models/user");

const userControllers = {};

userControllers.getUsers = (req, res) => {
  User.find({})
    .select("email")
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
};
userControllers.getUser = (req, res) => {
  let id = req.query.id;

  User.findById(id)
    .select("email")
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
};

userControllers.getUserMessages = (req, res) => {
  let id = req.query.id;

  User.findById(id)
    .select("messages")
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
};

module.exports = userControllers;

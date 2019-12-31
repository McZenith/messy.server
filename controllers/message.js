const Message = require("../models/message");
const User = require("../models/user");

const MessageControllers = {};

MessageControllers.getMessages = (req, res) => {
  // localhost:3001/api/   Messages?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  // ORDER = asc || desc
  Message.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)

    .populate("username")
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
};

MessageControllers.createMessage = (req, res, next) => {
  const message = new Message(req.body);
  const targetUser = req.query.username;
  message.owner = targetUser;
  message
    .save()
    .then(result => {
      return User.findOne({ username: targetUser });
    })
    .then(user => {
      user.messages.push(message);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        response: "Post created successfully!",
        message
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = MessageControllers;

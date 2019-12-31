const User = require("../models/user");

const authControllers = {};

authControllers.getAuth = (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    username: req.user.username
  });
};

authControllers.getRegister = (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false });
    res.status(200).json({
      success: true,
      user: doc
    });
  });
};

authControllers.getLogin = (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (!user)
      return res.json({
        isAuth: false,
        message: "Auth failed, email not found"
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: "Wrong password"
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("auth", user.token).json({
          isAuth: true,
          id: user._id,
          username: user.username
        });
      });
    });
  });
};

authControllers.getLogout = (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
};

module.exports = authControllers;

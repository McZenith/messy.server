var express = require("express");
var router = express.Router();
const userControllers = require("../controllers/user");

const { getUsers, getUser, getUserMessages } = userControllers;

/* GET home page. */
router.get("/users", getUsers);
router.get("/user", getUser);
router.get("/user_message", getUserMessages);

module.exports = router;

var express = require("express");
var router = express.Router();
const { auth } = require("../middleware/auth");

const messageControllers = require("../controllers/message");

const { getMessages, createMessage } = messageControllers;

/* GET home page. */
router.get("/messages", getMessages);
router.post("/create_message", auth, createMessage);

module.exports = router;

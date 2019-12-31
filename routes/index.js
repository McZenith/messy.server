var express = require("express");
var router = express.Router();
const indexControllers = require("../controllers/index");

const { getIndex } = indexControllers;

/* GET home page. */
router.get("/", getIndex);

module.exports = router;

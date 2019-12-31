var express = require("express");
var router = express.Router();
const authControllers = require("../controllers/auth");
const { auth } = require("../middleware/auth");

const { getAuth, getRegister, getLogin, getLogout } = authControllers;

router.get("/auth", auth, getAuth);
router.get("/logout", auth, getLogout);
router.post("/register", getRegister);
router.post("/login", getLogin);

module.exports = router;

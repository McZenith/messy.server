const createError = require("http-errors");
var express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const config = require("./config/config").get(process.env.NODE_ENV);
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");
const authRouter = require("./routes/auth");

var app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DATABASE)
  .then(() => console.log("MongoDB connected, Listening on port 3001"))
  .catch(err => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", userRouter);
app.use("/", authRouter);
app.use("/", messageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

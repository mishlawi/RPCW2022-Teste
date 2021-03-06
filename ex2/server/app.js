var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var axios = require("axios");
var indexRouter = require("./routes/index");

var app = express();

// ------------------------------------------------------------

app.use(function (req, res, next) {
  axios
    .post("http://clav-api.di.uminho.pt/v2/users/login", {
      username: "rpcw2022@gmail.com",
      password: "2022",
    })
    .then((dados) => {
      res.cookie("token", dados.data.token, {
        expires: new Date(Date.now() + "1d"),
        secure: false,
        httpOnly: true,
      });
      next();
    });
});

// ------------------------------------------------------------

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

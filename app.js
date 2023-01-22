//import modules
const express = require("express");
const bodyParser = require("body-parser");
// second arg is name space for logger
const debug = require("debug")("http");
const cookieParser = require("cookie-parser");
require("dotenv/config");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const passport = require("passport");
const morgan = require("morgan");

//passport configuration
require("./config/passport");
const winston = require("./config/winston");

const app = express();

//require all routes
const userRoutes = require("./route/user-route");
const homeRoutes = require("./route/home-route");
const dashboardRoutes = require("./route/dashboard");
const adminRoutes = require("./route/admin-route");

//middleware
//* session
app.use(
  session({
    secret: "password123",
    name: "sajad session",
    resave: false,
    saveUninitialized: false,

    // after 60sec the cookie gun...
    // cookie: { maxAge: 600000000000000000},
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
// passport
app.use(passport.initialize());
app.use(passport.session()); //work with session

//* use flash
app.use(flash()); // the flash in === req.flash

// dont know yet
app.use(cookieParser());

// set ejs and then we can render the ejs file
app.set("view engine", "ejs");
app.set("views", "views");
debug("set successfuly ejs");

//logging htpp request with morgan
app.use(morgan("combined", { stream: winston.stream }));
debug("morgan worker...");
debug("morgan successfule stream on winston");

/*
@title: url encoded
@Decs:
when user send data with form, data is coded
with body-parser we can encoded data 
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
debug("url encoded successfuly worked");

// serve statick file
app.use(express.static("public"));

//middleware end

//use routes
app.use(userRoutes);
debug(`userRoute worker`);
app.use(homeRoutes);
debug("homeRoute worker");
app.use(dashboardRoutes);
debug("dashboardRoute worker");
app.use(adminRoutes);
//end

//share app in server for creating server
module.exports = app;

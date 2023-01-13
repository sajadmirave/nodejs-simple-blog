//import modules
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv/config");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

//passport configuration
require("./config/passport");

const app = express();

//require all routes
const userRoutes = require("./route/user-route");
const homeRoutes = require("./route/home-route");
const dashboardRoutes = require("./route/dashboard");

//middleware
//* session
app.use(
  session({
    secret: "password123",
    name: "sajad session",
    resave: false,
    saveUninitialized: false,
    // after 60sec the cookie gun...
    cookie: { maxAge: 60000 },
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

/*
@title: url encoded
@Decs:
when user send data with form, data is coded
with body-parser we can encoded data 
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve statick file
app.use(express.static("public"));

//middleware end

//use routes
app.use(userRoutes);
app.use(homeRoutes);
app.use(dashboardRoutes);
//end

//share app in server for creating server
module.exports = app;

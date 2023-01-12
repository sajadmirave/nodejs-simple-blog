//import modules
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv/config");
const mongoose = require("mongoose");

const express = require("express");

const app = express();

//require all routes
const userRoutes = require("./route/user-route");
const homeRoutes = require("./route/home-route");
const dashboardRoutes = require("./route/dashboard");

//middleware
app.use(
  session({
    secret: "password123",
    resave: true,
    saveUninitialized: true,
    name: "sajad session",
  })
);

app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "views");

// for url encoded
app.use(express.urlencoded({ extended: true }));

//middleware end

//use routes
app.use(userRoutes);
app.use(homeRoutes);
app.use(dashboardRoutes);
//end

//server
const port = 3000;

//connect to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/toplearn")
  .then(() => {
    console.log("mongodb connected...");
    //create server
    app.listen(port, () => console.log(`server is running on port ${port}`));
  })
  .catch((err) => console.log(err));

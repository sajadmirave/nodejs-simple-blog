/*
@ module: Yup 
@ Desc: check data with yup (security layer)
first layer in js (in fronend)
second is validate with scema
and last layer is working with yup
*/
const Yup = require("yup");
const passport = require("passport");

//custom error message for yup
let YupErrMessage = {
  required: "is a required field",
  password: "password must be at least 4 characters",
  email: "email must be valid",
};

//create shape scema for yup
const yupScema = Yup.object().shape({
  //check the true email
  email: Yup.string()
    .email(YupErrMessage.email)
    .required("email " + YupErrMessage.required),
  password: Yup.string().min(4).max(255).required(),
  // check confirm password
  confirmpassword: Yup.string()
    .required()
    // check by password
    // null == dont empty
    .oneOf([Yup.ref("password"), null]),
});

//require model
const User = require("../model/User");

/*
@desc login page
check user data in here

@method GET
@path /user/login
*/
const getLoginPage = (req, res) => {
  res.render("login", {
    // "success_singup" is key for message
    message: req.flash("success_singup"),

    //passport error authentication
    // key passport error = "error"
    error: req.flash("error"),
  });
};

const handleLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    /*
    title: error message (flash)
    @Decs:
    if true the message we set in auth.js will show 
    the message in req.flash with key = "error"
    on the top, on getLoginPage we send error message to ejs file
    */
    failureFlash: true,
  })(req, res, next);
};

const handleLogout = (req, res, next) => {
  // its passport function for delete auth cookie
  // req.logout();
  req.logOut(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
  // set logout success message
  req.flash("success_logout", "Logout Successfuly...");
  res.redirect("/user/login");
};

/*
@desc singup page
show singup page

@method get
@path /user/singup
*/
const getSingupPage = (req, res) => {
  res.render("singup", {
    title: "SingUp",
    // error: null,
    errors: [],
    errrr: [],
  });
};

/*
@desc singup page
send user data to database

@method POST
@path /user/singup
*/
const addUser = async (req, res) => {
  const { email, password, confirmpassword } = req.body;

  //find email for checking user singup true or not
  let userEmail = await User.findOne({ email });

  const createNewUser = async () => {
    //new user
    const newUser = new User({
      email: email,
      password: password,
    });

    // sava to mongodb
    await newUser.save();
  };

  yupScema
    .validate(req.body)
    .then((result) => {
      createNewUser();
      console.log(result);
      /*
          @title: Flash
          @Desc: 
          set flash for showing message when user successfuly singup
          flash is save in cookie
          now in path: /user/singup method:get,
          we are sending message to client...
          */
      req.flash("success_singup", "SingUp SuccessFuly..."); //key : value

      // when everything is good(singup success), redirect to login page
      res.redirect("/user/login");
    })
    .catch((err) => {
      console.log(err);
      res.render("singup", {
        title: "SingUp",
        // send error to ejs file for hanndle error message
        errors: err.errors,
        // errrr: errorMessage[0],
      });
    });

  // res.status(201).json({
  //   message: "data created...",
  // });
};

// share all function to use in user-route
module.exports = {
  getLoginPage,
  getSingupPage,
  addUser,
  handleLogin,
  handleLogout,
};

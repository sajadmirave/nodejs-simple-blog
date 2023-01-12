const { Router } = require("express");
/*
@ module: Yup 
@ Desc: check data with yup (security layer)
first layer in js (in fronend)
second is validate with scema
and last layer is working with yup
*/
const Yup = require("yup");

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

const router = new Router();

//require model
const User = require("../model/User");

/*
@desc login page
check user data in here

@method GET
@path /user/login
*/
router.get("/user/login", (req, res) => {
  res.render("login", {});
});

/*
@desc singup page
show singup page

@method get
@path /user/singup
*/
router.get("/user/singup", (req, res) => {
  res.render("singup", {
    title: "SingUp",
    // error: null,
    errors: [],
  });
});

/*
@desc singup page
send user data to database

@method POST
@path /user/singup
*/
router.post("/user/singup", async (req, res) => {
  const { email, password, confirmpassword } = req.body;

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
      res.redirect("/user/login");
    })
    .catch((err) => {
      console.log(err);
      res.render("singup", {
        title: "SingUp",
        // send error to ejs file for hanndle error message
        errors: err.errors,
      });
    });

  // res.status(201).json({
  //   message: "data created...",
  // });
});

module.exports = router;

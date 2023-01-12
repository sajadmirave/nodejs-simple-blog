const { Router } = require("express");

const router = new Router();

//user controler
const {
  getLoginPage,
  getSingupPage,
  addUser,
} = require("../controler/user-controler");

/*
@desc login page
check user data in here

@method GET
@path /user/login
*/
router.get("/user/login", getLoginPage);

/*
@desc singup page
show singup page

@method get
@path /user/singup
*/
router.get("/user/singup", getSingupPage);

/*
@desc singup page
send user data to database

@method POST
@path /user/singup
*/
router.post("/user/singup", addUser);

module.exports = router;

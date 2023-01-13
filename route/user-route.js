const { Router } = require("express");

const router = new Router();

//user controler
const {
  getLoginPage,
  getSingupPage,
  addUser,
  handleLogin,
  handleLogout,
} = require("../controler/user-controler");

const { authenticated } = require("../middleware/auth");

/*
@desc login page
check user data in here

@method GET
@path /user/login
*/
router.get("/user/login", getLoginPage);

router.post("/user/login", handleLogin);

router.get("/user/logout", authenticated, handleLogout);

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

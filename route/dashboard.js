const { Router } = require("express");

const router = Router();

const User = require("../model/User");
const { authenticated } = require("../middleware/auth");

/*
@desc admin dashboard page
@method GET
@path /dashboard
*/
router.get("/dashboard", authenticated, (req, res) => {
  res.render("dashboard", {});
});

module.exports = router;

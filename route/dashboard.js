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
  if (req.session.passport.user.role === "admin") {
    res.render("dashboard", {
      user: req.user.email,
      admin: true,
    });
    return;
  }

  res.render("dashboard", {
    user: req.user.email,
    admin: false,
  });
});

module.exports = router;

const { Router } = require("express");

const router = Router();

const User = require("../model/User");

/*
@desc admin dashboard page
@method GET
@path /dashboard
*/
router.get("/dashboard", (req, res) => {
  res.render("dashboard", {});
});

module.exports = router;

const { Router } = require("express");

const router = new Router();

const { authenticated } = require("../middleware/auth");

const { authAdmin } = require("../middleware/authAdmin");

router.get("/admin", authenticated, authAdmin, (req, res) => {
  res.send("admin");
});

module.exports = router;

const { Router } = require("express");

const router = new Router();

router.get("/", (req, res) => {
  res.render("blog", {});
});

module.exports = router;

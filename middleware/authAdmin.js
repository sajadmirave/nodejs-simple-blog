exports.authAdmin = (req, res, next) => {
  console.log(req.session.passport.user.role);
  //   read from session and check it
  if (req.session.passport.user.role === "admin") {
    return next();
  }

  res.redirect("/dashboard");
};



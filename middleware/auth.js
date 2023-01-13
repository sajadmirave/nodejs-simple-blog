exports.authenticated = (req, res, next) => {
  // this function is in req with passport
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
};

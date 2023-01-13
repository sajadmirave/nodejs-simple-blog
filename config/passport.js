const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../model/User");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        //find email in database
        let user = await User.findOne({ email });

        if (!user) {
          return done(null, false, {
            message: "is not have user with this email",
          });
        }

        let isMatch = await User.findOne({ password });
        if (isMatch) {
          return done(null, user); //req.user
        } else {
          return done(null, false, {
            message: "Email or Password is not correct...",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

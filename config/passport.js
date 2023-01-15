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
        //check user. if cannot find the email show this error message
        // error has in flash => req.flash with key = "error"
        if (!user) {
          // 1 arg = error, 2 arg = user
          return done(null, false, {
            message: "is not have user with this email",
          });
        }
        //find password in database
        let isMatch = await User.findOne({ password });
        if (isMatch) {
          return done(null, user); //req.user
        } else {
          return done(null, false, {
            message: "Email or Password is not correct...",
          });
        }
        //catch system(app) error
      } catch (error) {
        console.log(error);
      }
    }
  )
);

/* 
@Decs:
see this page:
https://stackoverflow.com/questions/29066348/passportjs-serializeuser-and-deserializeuser-execution-flow
http://toon.io/understanding-passportjs-authentication-flow/
*/
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

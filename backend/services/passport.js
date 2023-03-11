const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const jwt = require("jsonwebtoken");
const fs = require("fs");

passport.use("password",
  new BearerStrategy(function (token, done) {
    if (token == process.env.PASSWORD) {
      done(null, true)
    } else {
      done("Incorrect password", null)
    }
  })
);


passport.use("token",
  new BearerStrategy(async function (token, done) {
    try {
      const publicKey = fs.readFileSync(process.env.JWT_SIGNING_PUBLIC);
      const checkJWT = await jwt.verify(token, publicKey);
      if (!checkJWT) {
        return done("JWT validation failed.");
      }
      done(null, checkJWT);
    } catch (err) {
      done("Token invalid.");
      console.log(err);
    }
  })
);

module.exports = passport;
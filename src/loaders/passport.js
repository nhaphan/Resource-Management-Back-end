const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
  passport.use(new JWTStrategy(opts, async (jwtPayload, done) => {
    const user = await User.findOne({ email: jwtPayload.email });
    try {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(null, false);
    }
  }));
};

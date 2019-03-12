const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const key = require("../config/keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrkey;

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                // console.log(jwt_payload);
                const user = await User.findById(jwt_payload.id)
                if (user) {
                    return done(null, user)
                }
                return done(null, false);
            } catch (e) {
                res.status(400).json(e)
            }


        })
    );
};
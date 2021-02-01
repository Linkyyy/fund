
const mongoose=require("mongoose")
const keys =require("../config/keys");
const User=mongoose.model("users")
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.privateKey;
module.exports=passport=>{
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findById(jwt_payload.id).then(user=>{
            if(user) return done(null,user);
        })
        .catch(err => console.log(err))

    }));
}
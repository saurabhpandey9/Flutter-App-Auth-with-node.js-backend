var jwtStrategy = require('passport-jwt').Strategy
var Extractjwt = require('passport-jwt').ExtractJwt

var User = require('../model/user')
var config = require('./dbconfig')
const { ExtractJwt } = require('passport-jwt')

module.exports = function(passport){
    var opts={}

    opts.secretOrKey = config.secret
    opts.jwtFromRequest =ExtractJwt.fromAuthHeaderWithScheme('jwt')

    passport.use(new jwtStrategy(opts, function(jwt_payload, done){
        User.find({
            id: jwt_payload.id

        }, function(err,user){
            if (err){
                return done(err,false)
            }
            if (user){
                return done(null,user)
            }
            else{
                return done(null,false)
            }
        }
        )
    }))
}
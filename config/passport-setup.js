const passport = require('passport');
const keys = require('./keys');
//const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('../models/user');

//passport.initialize();

/* passport.serializeUser((user, done) => {
    done(null , user.id);
});

passport.deserializeUser((id,done) => {
    Users.findById(id)
    .then((user) => {
        done(null , user);
    },err => done(err , false))
    .catch(err => done(err,false));
}) */

passport.use(new GoogleStrategy({
    //options for the google strategy
    callbackURL : '/auth/google/redirect',
    clientID : keys.google.CLIENT_ID,
    clientSecret : keys.google.CLIENT_SECRET
}, (accessToken , refreshToken, profile, done) =>{
    //passport callback function
    console.log('Passport callback function called ! ');
    
    Users.findOne({googleId : profile.id} , (err,user) => {
        if(err) {
            return done(err,false);
        }
        if(!err && user !== null) {
            return done(null , user);
        }
        else {
            new Users({
                username : profile.displayName,
                googleId : profile.id
            }).save((err , user) => {
                if(err) {
                    return done(err,false);
                }
                else {
                    return done(null , user);
                }
            });
        }
    });
    
}))

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
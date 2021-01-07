var passport = require('passport')
const User = require('../model/users.model');
var LocalStrategy = require('passport-local');
const { Strategy } = require('passport');

passport.serializeUser(function(user, done){
    done(null, user.id);
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    })
})

passport.use('local.signup', new LocalStrategy({
    userName: 'email',
    userPassword: 'password',
    pasReqToCallback : true
}, function(req, email, password, done){
    User.findOne({email: email}, function(err, use){
        if(err){
            return done(err);
        }
        if(user){
            return done(null, false, {message: 'Email is already in use.'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.enCryptPassword(password);
        newUser.save((err, result)=>{
            if(err){
                done(err);
            }
            return done(null, newUser);
        })
    })
}))
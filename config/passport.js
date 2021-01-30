var passport = require('passport')
const User = require('../model/user.model');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    })
})

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true,
    failureFlash: true
}, (req, email, password, done)=>{
    req.checkBody('email', 'invalid email.').notEmpty().isEmail();
    req.checkBody('password', 'invalid password').notEmpty().isLength({min: 4});
    var errors = req.validationErrors();
    if(errors){
        let messages = [];
        errors.forEach(function(err){
            messages.push(err.msg);
        })
        
        return done(null, false, req.flash('message', messages));
    }
    User.findOne({email: email}, function(err, user){
        if(err){
            return done(err, false, {});
        }
        if(user){
            return done(null, false, req.flash('message', 'Email is already in use.'));
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.enCryptPassword(password);
        newUser.save((err, result)=>{
            if(err){
                return done(err); 
            }
            return done(null, newUser);
        })
    })
}))

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true,
    failureFlash: true
}, (req, email, password, done)=>{
    req.checkBody('email', 'invalid email.').notEmpty();
    req.checkBody('password', 'invalid password').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        let messages = [];
        errors.forEach(function(err){
            messages.push(err.msg);
        })
        
        return done(null, false, req.flash('message', messages));
    }
    User.findOne({email: email}, function(err, user){
        if(err){
            return done(err, false, {});
        }
        if(!user){
            return done(null, false, req.flash('message', 'No user found.'));
        }
        if(!user.validPassword(password, user.password)){
            return done(null, false, req.flash('message', 'wrong password'));
        }
        return done(null, user);
    })
}))
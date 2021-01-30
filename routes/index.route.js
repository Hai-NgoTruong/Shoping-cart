const express = require('express');
const router = express.Router();
const passport = require('passport');
const csurf = require('csurf');

const controller = require('../controllers/index.controller');


const csurfProtection = csurf();
router.use(csurfProtection);


router.get('/', controller.index)

router.get('/user/signup', controller.get);

router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect : '/user/profile',
    failureRedirect : '/user/signup',
    failureFlash : true
}),controller.create);

router.post('/user/signin', passport.authenticate('local.signin', {
    successRedirect : '/user/profile',
    failureRedirect : '/user/signin',
    failureFlash : true
}));

router.get('/user/signin', controller.signin)
router.get('/user/profile', controller.userProfile)
module.exports = router;
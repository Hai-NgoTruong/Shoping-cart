var express = require('express');
var router = express.Router();

var controller = require('../controllers/index.controller');

const csurf = require('csurf');
const csurfProtection = csurf();

router.use(csurfProtection);


router.get('/', controller.index)

router.get('/user/signup', controller.get);

router.post('/user/signup', controller.create);
module.exports = router;
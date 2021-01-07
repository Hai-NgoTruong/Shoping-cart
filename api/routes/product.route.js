var express = require('express');
var multer  = require('multer');

var controller = require('../controllers/product.controller');
var router = express.Router();

// var upload = multer({ dest: './public/uploads/products/' })

// router.get('/', controller.index);

router.get('/:_id', controller.getProduct);

router.post('/', controller.create);

router.put('/:_id', controller.update);

module.exports = router;



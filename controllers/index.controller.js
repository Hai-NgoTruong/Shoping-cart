const Product = require('../model/products.model');

module.exports.index = async function(req, res){
	let products = await Product.find().lean()

	res.render('shop/index', {
		products
	})
};
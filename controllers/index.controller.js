const Product = require('../model/products.model');
const router = require('../api/routes/product.route');

module.exports.index = async (req, res) => {
	let page = parseInt(req.query.page) || 1;
	let perPage = 8;
	let start = (page - 1) * perPage;
	let end = page * perPage;
	let products = await Product.find().lean()
	// pagination
	res.render('shop/index', {
		products : products.slice(start, end)
	})
};

module.exports.get = (req, res) => {
	res.render('user/signup', {csurfToken: req.csrfToken()});
}

module.exports.create = (req, res) => {
	res.redirect('/');
}
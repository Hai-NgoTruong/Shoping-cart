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
	let messages = req.flash('message');
	if (req.user)
		return res.redirect('/user/profile')
	return res.render('user/signup', {
		csurfToken: req.csrfToken(),
		messages: messages,
		hasErrors: messages.length > 0
	});
}
module.exports.signin = (req, res) => {
	let messages = req.flash('message');
	if (req.user)
		return res.redirect('/user/profile')
	return res.render('user/signin', {
		csurfToken: req.csrfToken(),
		messages: messages,
		hasErrors: messages.length > 0
	});
}
module.exports.create = (req, res) => {
	res.redirect('/user/profile	');
}

module.exports.userProfile = (req, res) => {
    res.render('user/profile');
}

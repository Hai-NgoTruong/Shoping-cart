const Product = require('../../model/products.model');

// module.exports.index = async (req, res)=>{
// 	let products = await Product.find({});
// 	return res.json(products);

// };

module.exports.create = async (req, res)=>{
	let newProduct = await Product.create(req.body);
	return res.json(newProduct);
}

module.exports.getProduct = async (req, res)=>{
	let id = req.params._id;
	let product = await Product.findOne({_id : id});
	return res.json(product);
};

module.exports.update = async (req, res)=> {
	let id = req.params._id;
	let product = await Product.findOne({_id: id});
	product = new Product(req.body);
	return res.json(product); 
};


const { asyncHdl, errMsg, Result } = require('../utility');
const { Product } = require('../db');

// Create a product
exports.createProduct = asyncHdl(async (req, res, next) => {
	const { name, price, description } = req.body;

	if (!name || !price || !description) {
		return next(
			new errMsg('Product name, price and description are required.', 400)
		);
	}

	const product = await Product.create({
		name,
		price,
		description,
	});

	res
		.status(201)
		.json(new Result(true, 'Product created successful.', { product }));
});

// Find all products
exports.findProducts = asyncHdl(async (req, res, next) => {
	const products = await Product.findAll({});

	res.status(200).json(new Result(true, '', { products }));
});

// Find single products
exports.findOneProduct = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const product = await Product.findOne({
		where: { id },
	});

	res.status(200).json(new Result(true, '', { product }));
});

// Update a product
exports.updateProduct = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const hasProduct = await Product.findOne({
		where: { id },
	});

	if (!hasProduct) {
		return next(new errMsg('Product did not exists.', 404));
	}

	const { name, price, description } = req.body;

	const updatedField = {};

	if (name) updatedField.name = name;
	if (price) updatedField.price = price;
	if (description) updatedField.description = description;

	const updated = await Product.update(updatedField, {
		where: { id },
	});

	res.status(200).json(new Result(true, 'Product updated successful.', null));
});

// Delete a product
exports.deleteProduct = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const hasProduct = await Product.findOne({
		where: { id },
	});

	if (!hasProduct) {
		return next(new errMsg('Product did not exists.', 404));
	}

	const deleted = await Product.destroy({
		where: { id },
	});

	res.status(200).json(new Result(true, 'Product deleted successful.', null));
});

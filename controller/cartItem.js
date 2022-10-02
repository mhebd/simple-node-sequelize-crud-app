const { asyncHdl, errMsg, Result } = require('../utility');
const { CartItem } = require('../db');

// Create cart item
exports.createCartItem = asyncHdl(async (req, res, next) => {
	const { productId, CartId, quantity } = req.body;

	if (!productId || !CartId || !quantity) {
		return next(
			new errMsg('CartItem quantity, productId and cartId are required', 400)
		);
	}

	const cartItem = await CartItem.create({
		productId,
		CartId,
		quantity,
	});

	res
		.status(201)
		.json(new Result(true, 'CartItem Created successful.', { cartItem }));
});

// Update cart item
exports.updateCartItem = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const { quantity } = req.body;

	const updatedField = {};

	if (quantity) updatedField.quantity = quantity;

	const cartItem = await CartItem.update(updatedField, {
		where: { id },
	});

	res
		.status(201)
		.json(new Result(true, 'CartItem updated successful.', { cartItem }));
});

// Delete a cart item
exports.deleteCartItem = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const cartItem = await CartItem.destroy({
		where: { id },
	});

	res
		.status(201)
		.json(new Result(true, 'CartItem deleted successful.', { cartItem }));
});

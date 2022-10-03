const { asyncHdl, errMsg, Result } = require('../utility');
const { Cart, CartItem, Product } = require('../db');

// Get Cart by user id
exports.cartDetails = asyncHdl(async (req, res, next) => {
	const { id } = req.user;

	const cart = await Cart.findAll({
		where: {
			userId: id,
		},
		include: {
			model: CartItem,
			attributes: ['id', 'quantity'],
			include: {
				model: Product,
				attributes: ['id', 'name', 'price'],
			},
		},
	});

	res.status(200).json(new Result(true, '', { cart: cart[0] }));
});

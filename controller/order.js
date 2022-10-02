const { asyncHdl, errMsg, Result } = require('../utility');
const { Cart, CartItem, Product, Order } = require('../db');

// Create order by user id
exports.createOrder = asyncHdl(async (req, res, next) => {
	const { id } = req.user;

	const cart = await Cart.findAll({
		where: {
			userId: id,
		},
		include: {
			model: CartItem,
			include: {
				model: Product,
			},
		},
	});

	let totalPrice = 0;
	if (cart[0].CartItems.length > 0) {
		cart[0].CartItems.forEach((item) => {
			totalPrice += item.quantity * item.Product.price;
		});
	}

	const order = await Order.create({
		totalPrice,
		UserId: id,
		status: 'Created',
	});

	if (cart[0].CartItems.length > 0) {
		cart[0].CartItems.forEach(async (item) => {
			await CartItem.update(
				{
					CartId: null,
					OrderId: order.id,
				},
				{
					where: { id: item.id },
				}
			);
		});
	}

	res
		.status(200)
		.json(new Result(true, 'Order Created successful.', { order }));
});

// Find all orders
exports.findOrders = asyncHdl(async (req, res, next) => {
	const orders = await Order.findAll({
		include: {
			model: CartItem,
			include: {
				model: Product,
			},
		},
	});

	res.status(200).json(new Result(true, '', { orders }));
});

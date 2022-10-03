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
	const limit = req.query.limit * 1 || 20;
	const page = req.query.page * 1 || 1;
	const offset = limit * (page - 1);

	const orders = await Order.findAll({
		include: {
			model: CartItem,
			attributes: ['id', 'quantity'],
			include: {
				model: Product,
				attributes: ['id', 'name'],
			},
		},
		limit,
		offset,
	});

	res.status(200).json(new Result(true, '', { orders }));
});

// Find order by user
exports.findUserOrders = asyncHdl(async (req, res, next) => {
	const { id } = req.user;

	const limit = req.query.limit * 1 || 20;
	const page = req.query.page * 1 || 1;
	const offset = limit * (page - 1);

	const orders = await Order.findAll({
		where: { UserId: id },
		include: {
			model: CartItem,
			attributes: ['id', 'quantity'],
			include: {
				model: Product,
				attributes: ['id', 'name'],
			},
		},
		limit,
		offset,
	});

	res.status(200).json(new Result(true, '', { orders }));
});

// Update a order
exports.updateOrder = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const { status } = req.body;

	await Order.update(
		{ status },
		{
			where: { id },
		}
	);

	res.status(200).json(new Result(true, 'Order updated seccessful.', null));
});

// Delete a single order
exports.deleteOrder = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const order = await Order.findByPk(id);

	if (order.status == 'Created') {
		await Order.destroy({ where: { id } });
		res.status(200).json(new Result(true, 'Order deleted successful.', null));
	} else {
		res.status(200).json(new Result(true, 'Order deleted failed.', null));
	}
});

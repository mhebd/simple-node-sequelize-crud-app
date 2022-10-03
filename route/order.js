const express = require('express');
const { private, limited } = require('../middleware/auth');
const {
	createOrder,
	findOrders,
	findUserOrders,
	updateOrder,
	deleteOrder,
} = require('../controller/order');
const router = express.Router();

router.route('/').get(findOrders).post(private, createOrder);

router.route('/my-order').get(private, findUserOrders);

router.route('/:id').put(private, updateOrder).delete(deleteOrder);

module.exports = router;

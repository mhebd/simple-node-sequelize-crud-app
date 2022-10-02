const express = require('express');
const { private, limited } = require('../middleware/auth');
const { createOrder, findOrders } = require('../controller/order');
const router = express.Router();

router.route('/').get(findOrders).post(private, createOrder);

module.exports = router;

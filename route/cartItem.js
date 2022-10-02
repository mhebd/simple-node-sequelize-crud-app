const express = require('express');
// const { private, limited } = require('../middleware/auth');
const {
	createCartItem,
	updateCartItem,
	deleteCartItem,
} = require('../controller/cartItem');
const router = express.Router();

router.route('/').post(createCartItem);

router.route('/:id').put(updateCartItem).delete(deleteCartItem);

module.exports = router;

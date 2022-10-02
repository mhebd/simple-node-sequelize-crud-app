const express = require('express');
const { private, limited } = require('../middleware/auth');
const {
	createProduct,
	findProducts,
	findOneProduct,
	updateProduct,
	deleteProduct,
} = require('../controller/product');
const router = express.Router();

router.route('/').get(findProducts).post(createProduct);

router
	.route('/:id')
	.get(findOneProduct)
	.put(updateProduct)
	.delete(deleteProduct);

module.exports = router;

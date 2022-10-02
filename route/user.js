const express = require('express');
const { private } = require('../middleware/auth');
const {
	createUser,
	loginUser,
	findUsers,
	findOneUser,
	updateUser,
	deleteUser,
} = require('../controller/user');
const { cartDetails } = require('../controller/cart');
const router = express.Router();

router.route('/').get(findUsers);

router.route('/signup').post(createUser);
router.route('/login').post(loginUser);

router.route('/cart').get(private, cartDetails);

router.route('/:id').get(findOneUser).put(updateUser).delete(deleteUser);

module.exports = router;

const express = require('express');
const {
	createUser,
	loginUser,
	findUsers,
	findOneUser,
	updateUser,
	deleteUser,
} = require('../controller/user');
const router = express.Router();

router.route('/').get(findUsers);

router.route('/signup').post(createUser);
router.route('/login').post(loginUser);

router.route('/:id').get(findOneUser).put(updateUser).delete(deleteUser);

module.exports = router;

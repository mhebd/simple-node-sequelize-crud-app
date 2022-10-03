const { asyncHdl, errMsg, Result } = require('../utility');
const bcrypt = require('bcryptjs');
const { User, Contact, Cart, CartItem, Product } = require('../db');
const jwt = require('jsonwebtoken');

// Register a new User
exports.createUser = asyncHdl(async (req, res, next) => {
	const { name, email, password } = req.body;

	// Check field validity
	if (!name || !email || !password) {
		return next(new errMsg('User name, email and password are required!', 400));
	}

	// Check duplicate user
	const hasUser = await User.findOne({
		where: {
			email,
		},
	});

	if (hasUser) {
		return next(new errMsg('User already exits!', 400));
	}

	// Hashing password
	const hashPassword = await bcrypt.hash(password, 16);

	// Create user
	const user = await User.create({
		name,
		email,
		password: hashPassword,
	});

	// Create contact
	await Contact.create({
		userId: user.id,
	});

	// Create cart
	await Cart.create({
		userId: user.id,
	});

	// Create token
	const token = jwt.sign(
		{
			id: user.id,
			name: user.name,
			roll: user.roll,
		},
		process.env.SECRET,
		{
			expiresIn: process.env.EXPIRES,
		}
	);

	// Send response
	res
		.status(201)
		.json(new Result(true, 'User created successful.', { user, token }));
});

// Login a existing user
exports.loginUser = asyncHdl(async (req, res, next) => {
	const { email, password } = req.body;

	// Check field validity
	if (!email || !password) {
		return next(new errMsg('User email and password are required!', 400));
	}

	// Check duplicate user
	const user = await User.findOne({
		where: {
			email,
		},
	});

	if (!user) {
		return next(new errMsg('User did not exits!', 404));
	}

	// Match password
	const checkPassword = await bcrypt.compare(password, user.password);

	if (!checkPassword) {
		return next(new errMsg('User email or password did not mathch', 404));
	}

	// Create token
	const token = jwt.sign(
		{
			id: user.id,
			name: user.name,
			roll: user.roll,
		},
		process.env.SECRET,
		{
			expiresIn: process.env.EXPIRES,
		}
	);

	// Send response
	res
		.status(200)
		.json(new Result(true, 'User login successful.', { user, token }));
});

// Find all user
exports.findUsers = asyncHdl(async (req, res, next) => {
	const limit = req.query.limit * 1 || 20;
	const page = req.query.page * 1 || 1;
	const offset = limit * (page - 1);

	const users = await User.findAll({
		attributes: {
			exclude: ['password'],
		},
		limit,
		offset,
	});

	res.status(200).json(new Result(true, '', { users }));
});

// Find single user
exports.findOneUser = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findByPk(id, {
		attributes: { exclude: ['password', 'createdAt'] },
		include: [
			{
				model: Contact,
			},
		],
	});

	res.status(200).json(new Result(true, '', { user: user }));
});

// Update a User
exports.updateUser = asyncHdl(async (req, res, next) => {
	const { id } = req.params;
	const { name } = req.body;

	// Check has user
	const user = await User.findOne({
		where: { id },
	});

	if (!user) {
		return next(new errMsg('User did not exits!', 400));
	}

	const updatedField = {};

	if (name) updatedField.name = name;

	const updated = await User.update(updatedField, {
		where: { id },
	});

	if (!updated[0]) {
		return next(new errMsg('User update failed!', 500));
	}

	// Send response
	res.status(200).json(new Result(true, 'User updated successful.', null));
});

// Delete a  User
exports.deleteUser = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	// Check has user
	const user = await User.findOne({
		where: {
			id,
		},
	});

	if (!user) {
		return next(new errMsg('User did not exits!', 400));
	}

	// Create user
	const deleted = await User.destroy({
		where: { id },
	});

	if (!deleted) {
		return next(new errMsg('User deleted failed', 500));
	}

	// Send response
	res.status(200).json(new Result(true, 'User Deleted successful.', null));
});

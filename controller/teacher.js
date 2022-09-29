const { Teacher } = require('../db');
const asyncHdl = require('../utility/asyncHdl');
const errMsg = require('../utility/errMsg');

// Create a teacher
exports.createTeacher = asyncHdl(async (req, res, next) => {
	const { name, age, course } = req.body;

	const teacher = await Teacher.create({
		name,
		age,
		course,
	});

	res.status(201).json({
		success: true,
		message: 'Teacher created successful.',
		teacher,
	});
});

// Find all teacher
exports.findTeachers = asyncHdl(async (req, res, next) => {
	const teachers = await Teacher.findAll({});

	res.status(200).json({
		success: true,
		message: '',
		teachers,
	});
});

// Find single teacher
exports.findTeacher = asyncHdl(async (req, res, next) => {
	const { id } = req.params;
	const teacher = await Teacher.findOne({
		where: { id },
	});

	res.status(200).json({
		success: true,
		message: '',
		teacher,
	});
});

// Update a teacher
exports.updateTeacher = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const hasTeacher = await Teacher.findOne({
		where: { id },
	});

	if (!hasTeacher) {
		return next(new errMsg(`Teacher on id ${id} is not found.`, 404));
	}

	const { name, age, course } = req.body;

	const teacher = await Teacher.update(
		{ name, age, course },
		{
			where: { id },
		}
	);

	res.status(200).json({
		success: true,
		message: 'Teacher Updated Successful',
		teacher,
	});
});

// Delete a teacher
exports.deleteTeacher = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const hasTeacher = await Teacher.findOne({
		where: { id },
	});

	if (!hasTeacher) {
		return next(new errMsg(`Teacher on id ${id} is not found.`, 404));
	}

	const teacher = await Teacher.destroy({
		where: { id },
	});

	res.status(200).json({
		success: true,
		message: 'Teacher deleted successful.',
		teacher,
	});
});

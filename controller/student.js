const { Student } = require('../db');
const asyncHdl = require('../utility/asyncHdl');
const errMsg = require('../utility/errMsg');

// Create a student
exports.createStudent = asyncHdl(async (req, res, next) => {
	const { name, age, course } = req.body;

	const student = await Student.create({
		name,
		age,
		course,
	});

	res.status(201).json({
		success: true,
		message: 'Student created successful.',
		student,
	});
});

// Find all student
exports.findStudents = asyncHdl(async (req, res, next) => {
	const students = await Student.findAll({});

	res.status(200).json({
		success: true,
		message: '',
		students,
	});
});

// Find single student
exports.findStudent = asyncHdl(async (req, res, next) => {
	const { id } = req.params;
	const student = await Student.findOne({
		where: { id },
	});

	res.status(200).json({
		success: true,
		message: '',
		student,
	});
});

// Update a student
exports.updateStudent = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const hasStudent = await Student.findOne({
		where: { id },
	});

	if (!hasStudent) {
		return next(new errMsg(`Student on id ${id} is not found.`, 404));
	}

	const { name, age, course } = req.body;

	const student = await Student.update(
		{ name, age, course },
		{
			where: { id },
		}
	);

	res.status(200).json({
		success: true,
		message: 'Student Updated Successful',
		student,
	});
});

// Delete a student
exports.deleteStudent = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const hasStudent = await Student.findOne({
		where: { id },
	});

	if (!hasStudent) {
		return next(new errMsg(`Student on id ${id} is not found.`, 404));
	}

	const student = await Student.destroy({
		where: { id },
	});

	res.status(200).json({
		success: true,
		message: 'Student deleted successful.',
		student,
	});
});

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

//

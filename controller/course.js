const { Course } = require('../db');
const asyncHdl = require('../utility/asyncHdl');
const errMsg = require('../utility/errMsg');

// Create a course
exports.createCourse = asyncHdl(async (req, res, next) => {
	const { course: courseName } = req.body;

	const course = await Course.create({
		course: courseName,
	});

	res.status(201).json({
		success: true,
		message: 'Course created successful.',
		course,
	});
});

// Find all course
exports.findCourses = asyncHdl(async (req, res, next) => {
	const courses = await Course.findAll({});

	res.status(200).json({
		success: true,
		message: '',
		courses,
	});
});

// Find single course
exports.findCourse = asyncHdl(async (req, res, next) => {
	const { id } = req.params;
	const course = await Course.findOne({
		where: { id },
	});

	res.status(200).json({
		success: true,
		message: '',
		course,
	});
});

// Update a course
exports.updateCourse = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const hasCourse = await Course.findOne({
		where: { id },
	});

	if (!hasCourse) {
		return next(new errMsg(`Course on id ${id} is not found.`, 404));
	}

	const { course: courseName } = req.body;

	const course = await Course.update(
		{ course: courseName },
		{
			where: { id },
		}
	);

	res.status(200).json({
		success: true,
		message: 'Course Updated Successful',
		course,
	});
});

// Delete a course
exports.deleteCourse = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	const hasCourse = await Course.findOne({
		where: { id },
	});

	if (!hasCourse) {
		return next(new errMsg(`Course on id ${id} is not found.`, 404));
	}

	const course = await Course.destroy({
		where: { id },
	});

	res.status(200).json({
		success: true,
		message: 'Course deleted successful.',
		course,
	});
});

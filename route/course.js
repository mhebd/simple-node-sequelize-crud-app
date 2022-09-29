const express = require('express');
const {
	createCourse,
	findCourses,
	findCourse,
	updateCourse,
	deleteCourse,
} = require('../controller/course');
const router = express.Router();

router.route('/').get(findCourses).post(createCourse);

router.route('/:id').get(findCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;

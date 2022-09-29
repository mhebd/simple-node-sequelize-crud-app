const express = require('express');
const {
	createCourse,
	findCourses,
	findCourse,
} = require('../controller/course');
const router = express.Router();

router.route('/').get(findCourses).post(createCourse);

router.route('/:id').get(findCourse);

module.exports = router;

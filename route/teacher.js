const express = require('express');
const {
	createTeacher,
	findTeachers,
	findTeacher,
} = require('../controller/teacher');
const router = express.Router();

router.route('/').get(findTeachers).post(createTeacher);

router.route('/:id').get(findTeacher);

module.exports = router;

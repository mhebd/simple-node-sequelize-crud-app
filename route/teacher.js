const express = require('express');
const {
	createTeacher,
	findTeachers,
	findTeacher,
	updateTeacher,
	deleteTeacher,
} = require('../controller/teacher');
const router = express.Router();

router.route('/').get(findTeachers).post(createTeacher);

router.route('/:id').get(findTeacher).put(updateTeacher).delete(deleteTeacher);

module.exports = router;

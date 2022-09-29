const express = require('express');
const {
	createStudent,
	findStudents,
	findStudent,
} = require('../controller/student');
const router = express.Router();

router.route('/').get(findStudents).post(createStudent);

router.route('/:id').get(findStudent);

module.exports = router;

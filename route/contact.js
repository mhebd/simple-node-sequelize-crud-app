const express = require('express');
const { private, limited } = require('../middleware/auth');
const { updateContact } = require('../controller/contact');
const router = express.Router();

router.route('/').put(private, updateContact);

module.exports = router;

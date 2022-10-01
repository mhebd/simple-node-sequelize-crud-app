const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const error = require('./middleware/error');
require('dotenv').config({ path: './config/.env' });
//============================================//
// Import route path
const userRouter = require('./route/user');
const contactRouter = require('./route/contact');

// Create app instance
const app = express();

// Use middleware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// All route
app.use('/api/v1/user', userRouter);
app.use('/api/v1/contact', contactRouter);

// Test route
app.get('/', (req, res) => {
	res.json({
		message: 'Hello Developer!',
	});
});

// User error middleware
app.use(error);

// Export app
module.exports = app;

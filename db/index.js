const { Sequelize, DataTypes } = require('sequelize');
const Course = require('../model/Course');
const Student = require('../model/Student');
const Teacher = require('../model/Teacher');

// Create sequelize instance
const sequelize = new Sequelize(
	process.env.DATABASE,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		logging: false,
		dialect: 'mysql',
	}
);

// Connect database
sequelize
	.authenticate()
	.then(() => console.log(`Database connection success.`))
	.catch((err) => console.error(`Database connection failed.`, err));

// Connect with database model
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Add model
db.Student = Student(sequelize, DataTypes);
db.Teacher = Teacher(sequelize, DataTypes);
db.Course = Course(sequelize, DataTypes);

db.sequelize.sync({ force: false });

// Export database
module.exports = db;

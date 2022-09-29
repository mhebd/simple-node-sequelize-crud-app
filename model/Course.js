module.exports = (sequelize, DataTypes) => {
	const Course = sequelize.define(
		'Course',
		{
			course: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'Bangla',
				unique: true,
			},
		},
		{
			timestamps: false,
		}
	);

	return Course;
};

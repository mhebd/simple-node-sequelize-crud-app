module.exports = (sequelize, DataTypes) => {
	// Define student model
	const Student = sequelize.define(
		'Student',
		{
			name: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			age: DataTypes.INTEGER,
			course: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			updatedAt: false,
		}
	);

	return Student;
};

module.exports = (sequelize, DataTypes) => {
	const Teacher = sequelize.define(
		'Teacher',
		{
			name: {
				type: DataTypes.STRING,
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

	return Teacher;
};

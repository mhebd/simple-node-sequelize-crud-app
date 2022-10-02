module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Product',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			description: DataTypes.TEXT,
		},
		{
			updatedAt: false,
		}
	);
};

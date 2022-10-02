module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'CartItem',
		{
			quantity: DataTypes.INTEGER,
			productId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};

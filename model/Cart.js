module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Cart',
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: true,
			},
		},
		{
			timestamps: false,
		}
	);
};

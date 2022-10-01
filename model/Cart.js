module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Cart', {
		products: [DataTypes.INTEGER],
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
		},
	});
};

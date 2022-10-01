module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Order', {
		orderItems: [DataTypes.INTEGER],
		total: DataTypes.INTEGER,
		status: DataTypes.ENUM('Created', 'Shipped', 'Delivered'),
	});
};

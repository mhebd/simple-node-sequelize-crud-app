module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Order', {
		totalPrice: DataTypes.INTEGER,
		status: DataTypes.ENUM('Created', 'Shipped', 'Delivered'),
	});
};
